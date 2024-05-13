import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const Customer = () => {
  const singleCustomer = {
    id: 1,
    img: 'https://images.pexels.com/photos/17397364/pexels-photo-17397364.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    info: {
      username: 'SevenCoder',
      fullname: 'Hồ Chí Nhân',
      email: 'hochinhan5612@gmail.com',
      phone: '123 456 789',
      status: 'verified',
    },
    chart: {
      dataKeys: [
        { name: 'truy cập', color: '#82ca9d' },
        { name: 'tương tác', color: '#8884d8' },
      ],
      data: [
        {
          name: 'Chủ Nhật',
          'truy cập': 4000,
          'tương tác': 2400,
        },
        {
          name: 'Hai',
          'truy cập': 3000,
          'tương tác': 1398,
        },
        {
          name: 'Ba',
          'truy cập': 2000,
          'tương tác': 3800,
        },
        {
          name: 'Tư',
          'truy cập': 2780,
          'tương tác': 3908,
        },
        {
          name: 'Năm',
          'truy cập': 1890,
          'tương tác': 4800,
        },
        {
          name: 'Sáu',
          'truy cập': 2390,
          'tương tác': 3800,
        },
        {
          name: 'Bảy',
          'truy cập': 3490,
          'tương tác': 4300,
        },
      ],
    },
    activities: [
      {
        text: 'SevenCoder đã mua Playstation 5 Digital Edition',
        time: '3 ngày trước',
      },
      {
        text: 'SevenCoder thêm 3 sản phẩm vào danh sách yêu thích',
        time: '1 tuần trước',
      },
      {
        text: 'SevenCoder đã mua Sony Bravia KD-32w800',
        time: '2 tuần trước',
      },
      {
        text: 'SevenCoder bình luận sản phẩm',
        time: '1 tháng trước',
      },
      {
        text: 'SevenCoder thêm 1 sản phẩm vào danh sách yêu thích',
        time: '1 tháng trước',
      },
      {
        text: 'SevenCoder bình luận sản phẩm',
        time: '2 tháng trước',
      },
    ],
  };

  return (
    <div className="user">
      <div className="single">
        <div className="single__view">
          <div className="single__info">
            <div className="single__topInfo">
              {singleCustomer.img && <img src={singleCustomer.img} alt="" />}
              <button>Cập Nhật</button>
            </div>
            <div className="single__details">
              {Object.entries(singleCustomer.info).map((item) => (
                <div className="single__item" key={item[0]}>
                  <span className="single__itemTitle">{item[0]}</span>
                  <span className="single__itemValue">{item[1]}</span>
                </div>
              ))}
            </div>
          </div>
          <hr />
          {singleCustomer.chart && (
            <div className="single__chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={singleCustomer.chart.data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {singleCustomer.chart.dataKeys.map((dataKey) => (
                    <Line
                      type="monotone"
                      dataKey={dataKey.name}
                      stroke={dataKey.color}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div className="single__activities">
          <h2>Hoạt Động Cuối</h2>
          {singleCustomer.activities && (
            <ul>
              {singleCustomer.activities.map((activity) => (
                <li key={activity.text}>
                  <div>
                    <p>{activity.text}</p>
                    <time>{activity.time}</time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customer;
