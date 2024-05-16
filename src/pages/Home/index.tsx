import CartItemModel from '../../models/CartItemModel';
import FacebookMsg from '../FacebookMsg';
import Carousel from './components/Carousel';
import Category from './components/Category';
import DealProduct from './components/DealProduct';
import HottestProduct from './components/HottestProduct';
import NewestProduct from './components/NewestProduct';
import Service from './components/Service';
import SlideShow from './components/SlideShow';
import Testinomial from './components/Testimonial';

function Home() {
  return (
    <div className="container-fluid p-0">
      <Carousel />
      <Service />
      <Category />
      <DealProduct />
      <HottestProduct />
      <NewestProduct />
      <SlideShow />
      <Testinomial />
      <FacebookMsg />
    </div>
  );
}

export default Home;
