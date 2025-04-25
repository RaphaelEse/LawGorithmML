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
                { "x": "Authority", "y": 0.5 },
                { "x": "Amending", "y": 0.6 },
                { "x": "Definition", "y": 0.7 },
                { "x": "Precedent", "y": 0.8 },
                { "x": "Exception", "y": 0.9 }
            ]
        },
        {
            "id": "LegalBERT",
            "data": [
                { "x": "Authority", "y": 0.4 },
                { "x": "Amending", "y": 0.5 },
                { "x": "Definition", "y": 0.6 },
                { "x": "Precedent", "y": 0.7 },
                { "x": "Exception", "y": 0.8 }
            ]
        },
        {
            "id": "Longformer",
            "data": [
                { "x": "Authority", "y": 0.5 },
                { "x": "Amending", "y": 0.6 },
                { "x": "Definition", "y": 0.7 },
                { "x": "Precedent", "y": 0.8 },
                { "x": "Exception", "y": 0.9 }
            ]
        },
        {
            "id": "GCN",
            "data": [
                { "x": "Authority", "y": 0.4 },
                { "x": "Amending", "y": 0.5 },
                { "x": "Definition", "y": 0.6 },
                { "x": "Precedent", "y": 0.7 },
                { "x": "Exception", "y": 0.8 }
            ]
        }
    ];

return (
    <div style={{ height: 700 }}>
    <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 200 }}
        keys={['Authority', 'Amending', 'Definition', 'Precedent', 'Exception']}
        // valueFormat=">-.2s"
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            legend: 'Model',
            legendPosition: 'middle',
            legendOffset: -1000,
            legendOffset: 46,
            truncateTickAt: 0
        }}
 
        axisLeft={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Model',
            legendPosition: 'middle',
            legendOffset: -100,
            truncateTickAt: 0
        }}
        colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            divergeAt: 0.3,
            minValue: 0.5,
            maxValue: 1.0
        }}
        emptyColor="#555555"
        legends={[
            {
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