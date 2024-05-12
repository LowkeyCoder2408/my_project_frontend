import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import './PieCartBox.css';

const data = [
  { name: 'Mobile', value: 400, color: '#0088FE' },
  { name: 'Desktop', value: 300, color: '#00C49F' },
  { name: 'Laptop', value: 300, color: '#FFBB28' },
  { name: 'Tablet', value: 200, color: '#FF8042' },
];

const PieChartBox = () => {
  return (
    <div className="pieChartBox">
      <h1 className="pieChartBox__title">DẪN THEO NGUỒN</h1>
      <div className="pieChartBox__chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{
                background: 'white',
                borderRadius: '5px',
              }}
            />
            <Pie
              data={data}
              innerRadius={'70%'}
              outerRadius={'90%'}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="pieChartBox__options">
        {data.map((item) => (
          <div className="pieChartBox__option" key={item.name}>
            <div className="pieChartBox__option-title">
              <div
                className="pieChartBox__dot"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
