import os
import json
import re
from collections import defaultdict
from typing import List

# How many top base references to keep:
N_TITLES = 1
N_TITLES = min(N_TITLES, 53)

# How many "levels" of subsections to keep after the base node:
N_DEPTH = 7
N_DEPTH = min(N_DEPTH, 7)


class CitationGraphBuilder:
    """
    Builds a citation graph from JSON files found in a directory.
    Each citation is broken into a chain of USC citation parts
    (e.g., "33 USC" -> "33 USC 2201" -> "33 USC 2201(b)" -> "33 USC 2201(b)(1):2").
    Bill nodes (prefixed with "BILL:") are connected to the first citation node.
    """
    def __init__(self):
        self.node_label_to_index = {}
        self.nodes = []
        self.next_node_index = 0
        # Map from (source_idx, target_idx) to link weight (int)
        self.link_weight_map = defaultdict(int)

    def _get_or_create_node(self, label: str) -> int:
        if label not in self.node_label_to_index:
            self.node_label_to_index[label] = self.next_node_index
            self.nodes.append(label)
            self.next_node_index += 1
        return self.node_label_to_index[label]

    def normalize_usc_citation(self, text: str) -> re.Match:
        """
        Look for citations like "33 U.S.C. 2201(b)(1):2" and capture the title
        (group 1) and everything that follows (group 2), including any colon.
        """
        if not text:
            return None
        pattern = re.compile(r'(\d+)\s*U\.?\s*S\.?\s*C\.?\s*(.+)', re.IGNORECASE)
        return pattern.search(text)

    def get_citation_parts(self, text: str) -> List[str]:
        """
        Given raw text, parse out a progressive chain.
        For example, the text:
          "33 U.S.C. 2201(b)(1):2"
        returns:
          [
            "33 USC",
            "33 USC 2201",
            "33 USC 2201(b)",
            "33 USC 2201(b)(1)",
            "33 USC 2201(b)(1):2"
          ]
        """
        match = self.normalize_usc_citation(text)
        if not match:
            return []

        title_str = match.group(1).strip()  # e.g. "33"
        remainder = match.group(2).strip()    # e.g. "2201(b)(1):2"
        base_label = f"{title_str} USC"
        chain = [base_label]
        if not remainder:
            return chain

        # Get the section (first token in remainder)
        m_section = re.match(r'^([\w\-]+)', remainder)
        if not m_section:
            chain.append(f"{base_label} {remainder}")
            return chain
        section_str = m_section.group(1)
        full_section_label = f"{base_label} {section_str}"
        chain.append(full_section_label)

        # Process the rest of the string to capture parentheticals and any colon-delimited subclause.
        leftover = remainder[len(section_str):].strip()
        partial_label = full_section_label
        paren_pattern = re.compile(r'\([^)]*\)')
        while True:
            p = paren_pattern.match(leftover)
            if not p:
                break
            partial_label += p.group(0)
            chain.append(partial_label)
            leftover = leftover[len(p.group(0)):].strip()

        if leftover.startswith(":"):
            partial_label += leftover
            chain.append(partial_label)

        return chain

    def add_citation_to_graph(self, bill_name: str, raw_text: str):
        """
        Build a chain from the Bill node to the citation parts.
        """
        chain_parts = self.get_citation_parts(raw_text)
        if not chain_parts:
            return

        bill_label = f"BILL:{bill_name}"
        bill_idx = self._get_or_create_node(bill_label)

        prev = bill_idx
        for cp in chain_parts:
            curr_idx = self._get_or_create_node(cp)
            self.link_weight_map[(prev, curr_idx)] += 1
            prev = curr_idx

    def process_json_file(self, filepath: str):
        """
        Process one JSON file (e.g. "HR3561.txt.json").
        """
        bill_name = os.path.basename(filepath).replace(".txt.json", "")
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
            for item in data:
                if isinstance(item, dict):
                    if item.get("text"):
                        self.add_citation_to_graph(bill_name, item["text"])
                    if item.get("sectionAndSubSection"):
                        self.add_citation_to_graph(bill_name, item["sectionAndSubSection"])
                elif isinstance(item, str):
                    self.add_citation_to_graph(bill_name, item)
        except (json.JSONDecodeError, UnicodeDecodeError) as e:
            print(f"Error reading {filepath}: {e}")


    def process_directory(self, directory: str):
        """
        Process all .json files in the given directory.
        """
        for fn in os.listdir(directory):
            if fn.endswith(".json"):
                path = os.path.join(directory, fn)
                self.process_json_file(path)

    def filter_top_titles(self, top_n: int):
        """
        (1) Identify edges from Bill nodes to USC base nodes (e.g. "33 USC").
        (2) Select the top_n base nodes by total weight.
        (3) From each selected base node, perform a BFS to capture downstream nodes up to N_DEPTH.
        (4) Retain also the Bill->base edges feeding these nodes.
        """
        if top_n <= 0:
            return

        base_counts = defaultdict(int)
        base_bills_map = defaultdict(list)

        for (src_idx, tgt_idx), w in self.link_weight_map.items():
            if self.nodes[src_idx].startswith("BILL:"):
                base_counts[tgt_idx] += w
                base_bills_map[tgt_idx].append((src_idx, w))

        if not base_counts:
            return

        sorted_bases = sorted(base_counts.items(), key=lambda x: x[1], reverse=True)
        top_base_idxs = {idx for idx, _ in sorted_bases[:top_n]}

        adjacency = defaultdict(list)
        for (s, t), w in self.link_weight_map.items():
            adjacency[s].append(t)

        sub_nodes = set()
        sub_edges = {}

        def bfs_from_base(base_idx):
            visited = set([base_idx])
            queue = [(base_idx, 1)]
            while queue:
                curr, depth = queue.pop(0)
                sub_nodes.add(curr)
                for nxt in adjacency[curr]:
                    sub_edges[(curr, nxt)] = self.link_weight_map[(curr, nxt)]
                    if nxt not in visited and depth < N_DEPTH:
                        visited.add(nxt)
                        queue.append((nxt, depth + 1))

        for bidx in top_base_idxs:
            bfs_from_base(bidx)

        for bidx in top_base_idxs:
            for (bill_idx, w) in base_bills_map[bidx]:
                sub_nodes.add(bill_idx)
                sub_nodes.add(bidx)
                sub_edges[(bill_idx, bidx)] = self.link_weight_map[(bill_idx, bidx)]

        old2new = {}
        new_nodes = []
        new_link_map = {}
        new_label_map = {}

        for old_idx in sorted(sub_nodes):
            lbl = self.nodes[old_idx]
            new_idx = len(new_nodes)
            new_nodes.append(lbl)
            old2new[old_idx] = new_idx
            new_label_map[lbl] = new_idx

        for (s, t), w in sub_edges.items():
            if s in old2new and t in old2new:
                ns = old2new[s]
                nt = old2new[t]
                new_link_map[(ns, nt)] = w

        self.nodes = new_nodes
        self.node_label_to_index = new_label_map
        self.link_weight_map = new_link_map
        self.next_node_index = len(new_nodes)

    def save_graph_data(self, output_file: str):
        edges_list = []
        for (s, t), w in self.link_weight_map.items():
            edges_list.append({"source": s, "target": t, "weight": w})

        data = {
            "nodes": self.nodes,
            "edges": edges_list
        }

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

        print(f"Graph data saved to {output_file}")


def main():
    output_dir = os.path.join("artifacts")
    os.makedirs(output_dir, exist_ok=True)
    
    builder = CitationGraphBuilder()
    directory = os.path.join("citations")
    builder.process_directory(directory)
    builder.filter_top_titles(N_TITLES)
    builder.save_graph_data(output_file="artifacts/sankey_graph_data.json")


if __name__ == "__main__":
    main()
