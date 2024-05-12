import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from '../../../data';
import BarChartBox from '../../components/BarChartBox';
import BigChartBox from '../../components/BigChartBox';
import ChartBox from '../../components/ChartBox';
import PieChartBox from '../../components/PieCartBox';
import TopBox from '../../components/TopBox';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="home">
      <div className="home__box home__box1">
        <TopBox />
      </div>
      <div className="home__box home__box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="home__box home__box3">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="home__box home__box4">
        <PieChartBox />
      </div>
      <div className="home__box home__box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="home__box home__box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="home__box home__box7">
        <BigChartBox />
      </div>
      <div className="home__box home__box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="home__box home__box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Dashboard;
