import Carousel from './components/Carousel';
import Category from './components/Category';
import MostLikedProduct from './components/MostLikedProduct';
import Service from './components/Service';
import SlideShow from './components/SlideShow';
import Testinomial from './components/Testimonial';

function Home() {
  return (
    <div className="container-fluid p-0">
      <Carousel />
      <Service />
      <Category />
      <MostLikedProduct />
      <SlideShow />
      <Testinomial />
    </div>
  );
}

export default Home;
