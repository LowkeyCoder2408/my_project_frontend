import { Link } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import './ChartBox.css';

type Props = {
  color: string;
  title: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
};

const ChartBox = (props: Props) => {
  return (
    <div className="chartBox">
      <div className="chartBox__boxInfo">
        <div className="chartBox__boxInfo-title">
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <Link to="/" style={{ color: props.color }}>
          Xem tất cả
        </Link>
      </div>
      <div className="chartBox__chartInfo">
        <div className="chartBox__chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{
                  background: 'transparent',
                  border: 'none',
                }}
                labelStyle={{ display: 'none' }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chartBox__texts">
          <span
            className="chartBox__texts-percentage"
            style={{
              color: props.percentage < 0 ? 'tomato' : 'limegreen',
            }}
          >
            {props.percentage}%
          </span>
          <span className="chartBox__texts-duration">tháng này</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
