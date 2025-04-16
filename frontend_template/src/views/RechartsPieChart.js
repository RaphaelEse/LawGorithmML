import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Authority', value: 130 },
  { name: 'Definition', value: 127 },
  { name: 'Exception', value: 60 },
  { name: 'Precedent', value: 113 },
  { name: 'Rescinding', value: 38 },
  { name: 'Amending', value: 77 },

];

const data2 = [
  { name: 'A1', value: 43 },
  { name: 'A2', value: 32 },
  { name: 'A3', value: 30 },
  { name: 'A4', value: 25 },
  { name: 'B1', value: 33 },
  { name: 'B2', value: 34 },
  { name: 'B3', value: 29 },
  { name: 'B4', value: 31 },
  { name: 'C1', value: 12 },
  { name: 'C2', value: 16 },
  { name: 'C3', value: 14 },
  { name: 'C4', value: 18 },
  { name: 'D1', value: 8 },
  { name: 'D2', value: 10 },
  { name: 'D3', value: 9 },
  { name: 'D4', value: 11 },
  { name: 'E1', value: 25 },
  { name: 'E2', value: 20 },
  { name: 'E3', value: 22 },
  { name: 'E4', value: 24 },
  { name: 'F1', value: 21 },
  { name: 'F2', value: 17 },
  { name: 'F3', value: 19 },
  { name: 'F4', value: 20 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56'];


  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Count: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class Example extends PureComponent {
  state = {
    activeIndex: 0,
  };

  //Create a list of six distinct colors to be filled in the pie chart:

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={120}
            outerRadius={160}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
          {/* <Pie
            activeShape={renderActiveShape}
            data={data2}
            cx="50%"
            cy="50%"
            innerRadius={160}
            outerRadius={200}
            fill="#8884d8"
            dataKey="value"
          /> */}
        </PieChart>
      </ResponsiveContainer>
            
      </div>
    );
  }
}

