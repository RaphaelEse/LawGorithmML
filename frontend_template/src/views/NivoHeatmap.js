import React, { useState, useEffect } from "react";

import {ResponsiveHeatMap} from '@nivo/heatmap'

import * as d3 from 'd3'

const NivoHeatmap = () => {


    //   const [data, setData] = useState([]);
      
    //  //Fetch data from the CSV file, keep only data arrays and delete "columns" array
    //     useEffect(() => {
    //         d3.csv("/model_metrics_by_type.csv", d3.autoType).then((parsedData) => {
    //             const dataWithoutColumns = [...parsedData];
    //             console.log(dataWithoutColumns)
    //             setData(dataWithoutColumns);
    //         });
    //         }, []);

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
                { "x": "Amending", "y": 0.972 },
                { "x": "Definition", "y": 0.774 },
                { "x": "Precedent", "y": 0.772 },
                { "x": "Exception", "y": 0.889 },
                { "x": "Authority", "y": 0.812 }
            ]
        }
    ];

return (
    <div style={{ height: 700 }}>
    <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 200 }}
        keys={['Authority', 'Amending', 'Definition', 'Precedent', 'Exception']}
        valueFormat={value => `${value}%`}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            legend: 'Model',
            legendPosition: 'middle',
            legendOffset: -1000,
            legendOffset: 46,
            truncateTickAt: 0
        }}

        theme={{
            text: {
                fontSize: 15,
                fill: '#000000'
            },
            labels: {
                text: {
                    fontSize: 18,
                    fill: '#000000'
                }
            },
            legend: {
                text: {
                    fontSize: 8,
                    fill: '#000000'
                }
            },

        }}
        axisLeft={{
            // tickSize: 10,
            // tickPadding: 5,
            // tickRotation: 0,
            // legend: 'Model',
            // legendPosition: 'middle',
            // legendOffset: -100,
            // truncateTickAt: 0
        }}
        colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            divergeAt: 0.48,
            minValue: 70,
            maxValue: 100
        }}
        emptyColor="#555555"
        legends={[
            {
                tickFormat: value => `${value}%`,
                anchor: 'bottom',
                translateX: 0,
                translateY: 40,
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