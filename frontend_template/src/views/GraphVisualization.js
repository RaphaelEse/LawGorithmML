import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

function GraphVisualization({ data }) {
  return (
    <ForceGraph2D
      graphData={data}
      nodeLabel="id"  // Adjust if you want to show a different property
      nodeAutoColorBy="group"  // Optional: if your nodes have a 'group' property for color-coding
    />
  );
}

export default GraphVisualization;
