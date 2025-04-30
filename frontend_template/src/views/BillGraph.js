import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const BillGraph = ({ billId }) => {
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  // Mapping for relationship types to colors
  const typeColors = {
    "Amending": "#FF5733",
    "Authority": "#33FF57",
    "Definition": "#3357FF",
    "Exception": "#F1C40F",
    "Precedent ": "#CCCCCC"
  };

  // useEffect(() => {
  //   if (!billId) return;
  //   fetch(`http://34.205.59.36/api/bills/${billId}/graph`)
  //     .then(r => r.json())
  //     .then(data => setGraphData(data))
  //     .catch(err => console.error('Error fetching bill graph data:', err));
  // }, [billId]);

  useEffect(() => {
    if (!billId) return;
    // Fetch the graph data for the given billId
    fetch(`http://127.0.0.1:5000/bills/${billId}/graph`)
      .then(response => response.json())
      .then(data => setGraphData(data))
      .catch(error => console.error('Error fetching bill graph data:', error));
  }, [billId]);

  if (!graphData) {
    return <div>Loading graph...</div>;
  }

  // Map nodes to include a "name" property using bill_id or citation-specific property.
  const nodes = graphData.nodes.map(node => ({
    ...node,
    name: node.properties.text || node.properties.bill_id || "Node"
  }));

  // Map relationships (edges)
  const links = graphData.relationships.map(rel => ({
    source: rel.source, // internal node id
    target: rel.target, // internal node id
    type: rel.type
  }));

  // Get the bill node's id (assuming it has a label "Bill")
  const billNode = nodes.find(n => n.labels.includes("Bill"));
  const billNodeId = billNode ? billNode.id : null;

  // Build a mapping from each citation node's id to its connecting relationship type.
  // We assume that each citation node is connected directly to the Bill node.
  const citationColorMapping = {};
  if (billNodeId !== null) {
    graphData.relationships.forEach(rel => {
      // If bill node is at the source, then the other node is target.
      if (rel.source === billNodeId && rel.target !== billNodeId) {
        citationColorMapping[rel.target] = rel.type;
      }
      // Else if bill node is at the target, then the other node is source.
      else if (rel.target === billNodeId && rel.source !== billNodeId) {
        citationColorMapping[rel.source] = rel.type;
      }
    });
  }

  // Function to determine node color
  const getNodeColor = (node) => {
    if (node.labels.includes("Citation")) {
      // Get the relationship type from the mapping
      const relType = citationColorMapping[node.id] || "DEFAULT";
      return typeColors[relType] || typeColors["DEFAULT"];
    } else if (node.labels.includes("Bill")) {
      // Give Bill nodes a fixed color
      return "#00A0B0";
    } else {
      return "#CCCCCC";
    }
  };

  const handleNodeClick = (node, event) => {
    setSelectedNode(node);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Graph on the left */}
      <div>
        <h2>Graph for Bill {billId}</h2>
        <ForceGraph2D
          graphData={{ nodes, links }}
          nodeLabel={node => node.name}
          linkLabel={link => link.type}
          nodeColor={getNodeColor}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          width={800}
          height={600}
          onNodeClick={handleNodeClick}
        />
      </div>

      {/* Details panel on the right */}
      {selectedNode && (
        <div style={{
          marginLeft: '16px',
          padding: '8px',
          border: '1px solid #ccc',
          width: '300px',
          height: '600px',
          overflowY: 'auto'
        }}>
          <h3>Node Details</h3>
          <p><strong>Labels:</strong> {selectedNode.labels?.join(', ')}</p>
          {selectedNode.properties && (
            <div>
              {Object.entries(selectedNode.properties).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value?.toString() || '—'}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BillGraph;
