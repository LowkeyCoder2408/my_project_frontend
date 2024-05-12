import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './BigChartBox.css';

const data = [
  {
    name: 'Chủ Nhật',
    'cuốn sách': 4000,
    'quần áo': 2400,
    'điện tử': 2400,
  },
  {
    name: 'Hai',
    'cuốn sách': 3000,
    'quần áo': 1398,
    'điện tử': 2210,
  },
  {
    name: 'Ba',
    'cuốn sách': 2000,
    'quần áo': 9800,
    'điện tử': 2290,
  },
  {
    name: 'Tư',
    'cuốn sách': 2780,
    'quần áo': 3908,
    'điện tử': 2000,
  },
  {
    name: 'Năm',
    'cuốn sách': 1890,
    'quần áo': 4800,
    'điện tử': 2181,
  },
  {
    name: 'Sáu',
    'cuốn sách': 2390,
    'quần áo': 3800,
    'điện tử': 2500,
  },
  {
    name: 'Bảy',
    'cuốn sách': 3490,
    'quần áo': 4300,
    'điện tử': 2100,
  },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1 className="bigChartBox__title">PHÂN TÍCH DOANH THU</h1>
      <div className="bigChartBox__chart">
        {' '}
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="điện tử"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="quần áo"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="cuốn sách"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
