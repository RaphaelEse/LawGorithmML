import os
import json
import re
from collections import defaultdict

# Get the Neo4j home directory from the environment variable
# see https://github.com/neo4j/neo4j
NEO4J_HOME = os.getenv("NEO4J_HOME")
if not NEO4J_HOME:
    raise EnvironmentError("NEO4J_HOME environment variable is not set!")

# Expand user directory and form the full import path
DIR = os.path.expanduser(f"{NEO4J_HOME}/import/citations")

NODES_CSV = os.path.join(DIR, "nodes.csv")
RELATIONSHIPS_CSV = os.path.join(DIR, "relationships.csv")


# Regex for USC references
USC_PATTERN = re.compile(
    r'(\d+)\s*U\.?\s*S\.?\s*C\.?\s*(.+)',  # e.g. "12 U.S.C. 2128(b)(2)(A)(i):2"
    re.IGNORECASE
)

def get_parenthetical_label(segment):
    """
    Given a string like '(b)', '(2)', '(A)', '(i)', etc., return a well-established
    legal label: Subsection, Paragraph, Subparagraph, Clause, etc.
    Default to 'Subsection' if we can't determine a more specific category.
    """
    content = segment.strip("()").strip()

    # a) Single or multi-letter lowercase => Subsection
    # b) Numeric => Paragraph
    # c) Uppercase => Subparagraph
    # d) Roman (roughly) => Clause
    if re.match(r'^[a-z]+$', content):
        return "Subsection"
    elif re.match(r'^[0-9]+$', content):
        return "Paragraph"
    elif re.match(r'^[A-Z]+$', content):
        return "Subparagraph"
    elif re.match(r'^[ivxlcdm]+$', content, re.IGNORECASE):
        return "Clause"
    else:
        return "Subsection"

def parse_usc_chain(full_text):
    """
    Splits a string like "12 U.S.C. 2128(b)(2)(A)(i):2" into parent-child segments
    AND assigns legal labels to each node according to hierarchical position.

    We'll produce a chain of (node_name, node_label) from shallowest to deepest, e.g.:
      [ ("12 USC", "Title"),
        ("12 USC 2128", "Section"),
        ("12 USC 2128(b)", "Subsection"),
        ("12 USC 2128(b)(2)", "Paragraph"),
        ("12 USC 2128(b)(2)(A)", "Subparagraph"),
        ("12 USC 2128(b)(2)(A)(i)", "Clause"),
        ("12 USC 2128(b)(2)(A)(i):2", "Subclause") ]
    """
    # Normalize spacing
    text = full_text.replace("U.S.C.", "USC").replace(":", ":").strip()
    match = USC_PATTERN.search(text)
    if not match:
        return []

    title_num = match.group(1).strip()   # e.g. "12"
    remainder = match.group(2).strip()  # e.g. "2128(b)(2)(A)(i):2"

    # 1) Start chain with the base "12 USC" => label: Title
    base_name = f"{title_num} USC"
    chain_nodes = [(base_name, "Title")]

    # 2) Parse out the leading digits/letters for the section reference
    m = re.match(r'^(\w+)', remainder)
    if not m:
        # If no immediate alphanumeric, treat the entire remainder as one chunk
        node_name = f"{base_name} {remainder}"
        chain_nodes.append((node_name, "Section"))  # fallback label
        return chain_nodes

    # If we do have a chunk like "2128"
    section_str = m.group(1)
    pos = len(section_str)
    current_label_str = f"{base_name} {section_str}"

    # We'll label this second chunk "Section" by default
    chain_nodes.append((current_label_str, "Section"))

    # 3) Collect subsequent parentheses or bracket segments
    leftover = remainder[pos:]
    paren_pattern = re.compile(r'\([^)]*\)')  # matches e.g. "(b)", "(2)", "(A)", etc.
    while True:
        p = paren_pattern.match(leftover)
        if not p:
            break
        # For each parenthetical, we update current_label_str and assign appropriate label
        current_label_str += p.group(0)
        label = get_parenthetical_label(p.group(0))
        chain_nodes.append((current_label_str, label))

        leftover = leftover[len(p.group(0)):]

    # 4) Handle any leftover that starts with ':'
    #    We'll treat it as a "subclause" or similar extension
    leftover = leftover.strip()
    if leftover.startswith(":"):
        current_label_str += leftover
        chain_nodes.append((current_label_str, "Subclause"))
        leftover = ""

    return chain_nodes

def collect_citations_from_file(filepath):
    """
    Reads JSON array from the given file.
    Looks for 'text' or 'sectionAndSubSection' fields that might have USC references.
    Returns a set of all chain-lists (tuples of (node_name, node_label)) to avoid duplicates.
    """
    all_chains = set()
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
        for item in data:
            # Combine any relevant fields
            possible_cites = []
            if 'text' in item and item['text']:
                possible_cites.append(item['text'])
            if 'sectionAndSubSection' in item and item['sectionAndSubSection']:
                possible_cites.append(item['sectionAndSubSection'])

            for raw_str in possible_cites:
                chain = parse_usc_chain(raw_str)
                if chain:
                    # Convert to a tuple of tuples so it's hashable
                    chain_tuples = tuple((n, l) for (n, l) in chain)
                    all_chains.add(chain_tuples)

    return all_chains

def main():
    citations_dir = os.path.join("citations")
    if not os.path.exists(citations_dir):
        print(f"Directory not found: {citations_dir}")
        return

    # Track node -> numeric ID and label
    # node_id_map: { node_name: (node_id, label) }
    node_id_map = {}
    next_id = 0

    # Relationship storage
    relationships_cites = []
    relationships_has_subsection = set()

    def get_node_id(name, label):
        """
        Assign (or retrieve) a unique numeric ID to each node name.
        We'll store the first label we see for that node name.
        If the node appears again with a different label, we simply keep the existing label.
        """
        nonlocal next_id
        if name not in node_id_map:
            node_id_map[name] = (next_id, label)
            next_id += 1
        return node_id_map[name][0]

    # 1) Process each .json in the citations_dir -> create a Bill node & parse USC references
    for filename in os.listdir(citations_dir):
        if not filename.endswith(".json"):
            continue

        bill_path = os.path.join(citations_dir, filename)

        # Bill ID from filename, e.g. "HR2864.txt.json" => "HR2864"
        bill_name = filename.replace(".txt.json", "")
        bill_id = get_node_id(bill_name, "Bill")

        # parse citations from the file
        chains = collect_citations_from_file(bill_path)

        # For each chain, link Bill -> the deepest node in chain, then
        # chain[i] -> chain[i+1] for i in [0..] as HAS_SUBSECTION
        for chain_tuple in chains:
            if not chain_tuple:
                continue

            # Use the deepest cited node as the target of the bill citation
            deepest_name, deepest_label = chain_tuple[-1]
            deepest_id = get_node_id(deepest_name, deepest_label)
            relationships_cites.append((bill_id, deepest_id, "CITES"))

            # Build HAS_SUBSECTION relationships between consecutive elements
            for i in range(len(chain_tuple) - 1):
                parent_name, parent_label = chain_tuple[i]
                child_name, child_label = chain_tuple[i + 1]

                parent_id = get_node_id(parent_name, parent_label)
                child_id = get_node_id(child_name, child_label)

                relationships_has_subsection.add((parent_id, child_id, "HAS_SUBSECTION"))

    # 2) Write out CSV: nodes.csv and relationships.csv
    os.makedirs(DIR, exist_ok=True)

    # Write nodes
    with open(NODES_CSV, "w", encoding="utf-8") as f_nodes:
        f_nodes.write("nodeId:ID,name,:LABEL\n")
        for name, (nid, label) in node_id_map.items():
            safe_name = name.replace('"', '""')
            f_nodes.write(f'{nid},"{safe_name}",{label}\n')

    # Write relationships
    with open(RELATIONSHIPS_CSV, "w", encoding="utf-8") as f_rels:
        f_rels.write("start:START_ID,end:END_ID,:TYPE\n")
        # First, write out all CITES relationships (duplicates allowed)
        for (start_id, end_id, rel_type) in relationships_cites:
            f_rels.write(f"{start_id},{end_id},{rel_type}\n")
        # Then, write unique HAS_SUBSECTION relationships
        for (start_id, end_id, rel_type) in relationships_has_subsection:
            f_rels.write(f"{start_id},{end_id},{rel_type}\n")

    print("CSV export complete!")
    print(f"Nodes: {len(node_id_map)}")
    print(f"Relationships (CITES + HAS_SUBSECTION): "
          f"{len(relationships_cites) + len(relationships_has_subsection)}")

    print("----")
    print(f"$NEO4J_HOME/bin/neo4j-admin database import full --overwrite-destination \\")
    print(f'    --nodes="{os.path.abspath(NODES_CSV)}" \\')
    print(f'    --relationships="{os.path.abspath(RELATIONSHIPS_CSV)}"')
    print("----")

if __name__ == "__main__":
    main()
