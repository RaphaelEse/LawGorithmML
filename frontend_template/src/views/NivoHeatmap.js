import React from "react";

import {ResponsiveHeatMap} from '@nivo/heatmap'

const NivoHeatmap = () => {

    const data = [
        {
            "id": "Custom Zero-Shot Model",
            "data": [
                
                { "x": "Amending", "y": 90.84 },
                { "x": "Definition", "y": 96.02 },
                { "x": "Precedent", "y": 86.82 },
                { "x": "Exception", "y": 94.54 },
                { "x": "Authority", "y": 86.11 },
            ]
        },
        {
            "id": "LegalBERT",
            "data": [
                
                { "x": "Amending", "y": 96.45 },
                { "x": "Definition", "y": 96.67 },
                { "x": "Precedent", "y": 95.32 },
                { "x": "Exception", "y": 97.28 },
                { "x": "Authority", "y": 88.56 },
            ]
        },
        {
            "id": "Distil-BERT",
            "data": [
                
                { "x": "Amending", "y": 97.01 },
                { "x": "Definition", "y": 97.39 },
                { "x": "Precedent", "y": 94.68 },
                { "x": "Exception", "y": 97.23 },
                { "x": "Authority", "y": 92.30 }
            ]
        },
        {
            "id": "GCN",
            "data": [
                { "x": "Amending", "y": 73.28 },
                { "x": "Definition", "y": 77.42 },
                { "x": "Precedent", "y": 84.62 },
                { "x": "Exception", "y": 68.79 },
                { "x": "Authority", "y": 75.68 }
            ]
        }
    ];

return (
    <div style={{ height: 720 }}>
    <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 90, left: 200 }}
        keys={['Authority', 'Amending', 'Definition', 'Precedent', 'Exception']}
        valueFormat={value => `${value}%`}
        axisTop={{
            tickSize: 10,
            tickPadding: 5,
        }}
        axisLeft={{
            tickSize: 10,
            tickPadding: 5,
        }}
        labelTextColor={"#000000"}
        theme={{
            text: {
                fontSize: 15,
                fill: '#000000'
            },
            labels: {
                text: {
                    fontSize: 18,
                    fill: '#000000',
                    strokeWidth: 0.5,
                    stroke: '#000000',
                }
            },
            legend: {
                text: {
                    fontSize: 18,
                    fill: '#ffffff'
                }
            },

        }}
        colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            divergeAt: 0.48,
            minValue: 65,
            maxValue: 100
        }}
        legends={[
            {
                tickFormat: value => `${value}%`,
                anchor: 'bottom',
                translateX: 0,
                translateY: 70,
                length: 800,
                thickness: 20,
                direction: 'row',
                tickPosition: 'after',
                tickSize: 3,
                tickSpacing: 5,
                tickOverlap: false,
                title: 'Accuracy per Citation Type →',
                titleAlign: 'start',
                titleOffset: 4
            }
        ]}
        animate={true}
        motionConfig="gentle"
    />
    </div>
  );
}
export default NivoHeatmap;