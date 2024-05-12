import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';
import './BarChartBox.css';

type Props = {
  title: string;
  color: string;
  dataKey: string;
  chartData: object[];
};

const BarChartBox = (props: Props) => {
  return (
    <div className="barChartBox">
      <h1 className="barChartBox__title">{props.title}</h1>
      <div className="barChartBox__chart">
        {' '}
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{
                background: '#2a3447',
                borderRadius: '5px',
              }}
              labelStyle={{ display: 'none' }}
              cursor={{ fill: 'none' }}
            />
            <Bar
              dataKey={props.dataKey}
              fill={props.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
