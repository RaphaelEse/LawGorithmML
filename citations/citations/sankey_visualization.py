import json
import re
import plotly.graph_objects as go
from sankey_data_processing import N_TITLES, N_DEPTH

def load_graph_data(input_file: str):
    """
    Load the preprocessed graph data.
    Returns a tuple: (nodes, edges)
    """
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data["nodes"], data["edges"]


def build_sankey_figure(nodes, edges, n_titles, n_depth):
    """
    Build the Sankey diagram using Plotly.
    Edges are rendered with their weights, and node colors are determined based on
    whether they represent a Bill or a USC citation, with citation nodes colored by depth.
    """
    sources = []
    targets = []
    values = []

    for edge in edges:
        sources.append(edge["source"])
        targets.append(edge["target"])
        values.append(edge["weight"])

    # Enhanced node coloring: Bills are one color; USC nodes get a color based on their depth.
    node_colors = []
    for label in nodes:
        if label.startswith("BILL:"):
            node_colors.append("#a6cee3")
        else:
            # Determine level:
            #   - If the label is exactly "33 USC" (i.e. title), set level 0.
            #   - Otherwise, assign level = 1 + (number of parenthetical groups).
            if re.match(r'^\d+\s+USC$', label):
                level = 0
            else:
                level = 1 + label.count('(')
            # A simple color palette for different depths
            color_palette = ["#1f78b4", "#33a02c", "#e31a1c", "#ff7f00",
                             "#6a3d9a", "#b15928", "#a6d854", "#ffd92f"]
            node_colors.append(color_palette[min(level, len(color_palette) - 1)])

    fig = go.Figure(
        data=[
            go.Sankey(
                valueformat=".0f",
                node=dict(
                    pad=50,
                    thickness=20,
                    label=nodes,
                    color=node_colors,
                    hovertemplate="%{label}: %{value}<extra></extra>",
                ),
                link=dict(source=sources, target=targets, value=values),
            )
        ]
    )

    fig.update_layout(
        title_text=f"Top {n_titles} USC Citations (up to depth={n_depth})",
        font_size=10,
        width=2200,
        height=2000,
        margin=dict(l=150, r=150, t=80, b=80),
    )
    return fig


def save_sankey_html(nodes, edges, n_titles, n_depth, output_path="citation_sankey.html"):
    """
    Build the Sankey figure and write it to an HTML file.
    """
    fig = build_sankey_figure(nodes, edges, n_titles, n_depth)
    fig.write_html(output_path)
    print(f"Sankey diagram saved to {output_path}")


def main():
    nodes, edges = load_graph_data("artifacts/sankey_graph_data.json")
    save_sankey_html(nodes, edges, N_TITLES, N_DEPTH, "artifacts/citation_sankey.html")


if __name__ == "__main__":
    main()
