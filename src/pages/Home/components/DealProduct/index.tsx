import { useState, useEffect } from 'react';
import './DealProduct.css';
import ProductModel from '../../../../models/ProductModel';
import ProductItem from './components/ProductItem';
import BrandItem from './components/BrandItem/BrandItem';
import BrandModel from '../../../../models/BrandModel';

const DealProduct = () => {
  const [productList, setProductList] = useState<ProductModel[]>([
    new ProductModel(
      1,
      'Smartphone XYZ',
      'smartphone-xyz',
      'This is a short description of Smartphone XYZ',
      'This is the full description of Smartphone XYZ',
      new Date('2024-04-06T08:00:00Z'),
      new Date('2024-04-06T10:30:00Z'),
      true,
      100,
      50,
      5000000,
      4500000,
      10,
      150,
      70,
      10,
      200,
      'Android',
      'https://res.cloudinary.com/dgdn13yur/image/upload/v1709607925/Dien_thoai_iPhone_13_128GB_yo9kdi.png',
      1,
      1,
      20,
      15,
      4.5,
    ),
    new ProductModel(
      2,
      'Laptop ABC',
      'laptop-abc',
      'This is a short description of Laptop ABC',
      'This is the full description of Laptop ABC',
      new Date('2024-04-06T09:00:00Z'),
      new Date('2024-04-06T11:30:00Z'),
      true,
      50,
      20,
      15000000,
      13000000,
      13.33,
      300,
      200,
      20,
      1500,
      'Windows',
      'https://res.cloudinary.com/dgdn13yur/image/upload/v1709607925/Dien_thoai_iPhone_13_128GB_yo9kdi.png',
      2,
      2,
      10,
      8,
      4.2,
    ),
  ]);

  const brands = [
    new BrandModel(1, 'Brand A', 'brand-a-logo.png', []),
    new BrandModel(2, 'Brand B', 'brand-b-logo.png', []),
    // Thêm các thương hiệu và danh mục khác nếu cần
  ];

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const daysUntilNextSunday = currentDay === 0 ? 7 : 7 - currentDay;
    const nextSunday = new Date(currentDate);
    nextSunday.setDate(currentDate.getDate() + daysUntilNextSunday);

    const sundayDate = nextSunday.getDate();
    const sundayMonth = nextSunday.getMonth() + 1;
    const sundayYear = nextSunday.getFullYear();

    const sundayDateString = `${sundayDate}-${sundayMonth}-${sundayYear}`;
    const countdownElement = document.getElementById('countdowntimer');

    if (!countdownElement) {
      console.error('countdownElement is null');
      return;
    }

    countdownElement.setAttribute('data-date', sundayDateString);
    const dateString = countdownElement.getAttribute('data-date');
    const timeString = countdownElement.getAttribute('data-time');

    // Chuyển đổi dateString và timeString thành một đối tượng Date hợp lệ
    const [day, month, year] = dateString?.split('-') || ['0', '0', '0'];
    const [hour, minute] = timeString?.split(':') || ['0', '0'];
    const yearNumber = parseInt(year, 10);
    const monthNumber = parseInt(month, 10) - 1;
    const dayNumber = parseInt(day, 10);
    const hourNumber = parseInt(hour, 10);
    const minuteNumber = parseInt(minute, 10);

    const targetDate = new Date(
      yearNumber,
      monthNumber,
      dayNumber,
      hourNumber,
      minuteNumber,
    ).getTime();

    const updateCountdown = () => {
      const countdownElement = document.getElementById('countdowntimer');
      if (!countdownElement) {
        console.error('countdownElement is null');
        return;
      }
      const currentDate = new Date().getTime();
      const difference = targetDate - currentDate;

      console.log('Difference:', difference);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      console.log('Days:', days);

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      console.log('Hours:', hours);

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      console.log('Minutes:', minutes);

      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      console.log('Seconds:', seconds);

      const dayElement = countdownElement.querySelector('.day .num');
      const hourElement = countdownElement.querySelector('.hour .num');
      const minElement = countdownElement.querySelector('.min .num');
      const secElement = countdownElement.querySelector('.sec .num');

      if (dayElement && hourElement && minElement && secElement) {
        dayElement.textContent = days.toString();
        hourElement.textContent = hours.toString().padStart(2, '0');
        minElement.textContent = minutes.toString().padStart(2, '0');
        secElement.textContent = seconds.toString().padStart(2, '0');
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="deals col-lg-9 col-sm-12">
          <div className="deals__header">
            <h1 className="deals__title">Siêu sale trong tuần</h1>
            <div
              data-time="00:00"
              className="deals__countdown"
              id="countdowntimer"
            >
              <svg
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <div className="day">
                <span className="num">0</span>
                <span className="word"> days</span>
                <span className="sign">:</span>
              </div>
              <div className="hour">
                <span className="num">0</span>
                <span className="word"> hours</span>
                <span className="sign">:</span>
              </div>
              <div className="min">
                <span className="num">0</span>
                <span className="word"> mins</span>
                <span className="sign">:</span>
              </div>
              <div className="sec">
                <span className="num">0</span>
                <span className="word"> secs</span>
              </div>
            </div>
          </div>
          <div className="deals__list  bg-white">
            {productList.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="top-selling col-lg-3 col-sm-12">
          <div className="top-selling__header">
            <h1 className="top-selling__title">Top Selling Vendor</h1>
          </div>
          <div className="top-selling__list  bg-white">
            {brands.map((brand) => (
              <BrandItem key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealProduct;
