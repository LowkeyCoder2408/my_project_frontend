import { useState, useEffect } from 'react';
import './DealProduct.css';
import ProductModel from '../../../../models/ProductModel';
import ProductItem from './components/ProductItem';
import { toast } from 'react-toastify';
import {
  getDealProducts,
  getTopSoldProducts,
} from '../../../../api/ProductAPI';
import LongWidthProduct from './components/LongWidthProduct';

const DealProduct = () => {
  const [dealProductList, setDealProductList] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [topSoldProductList, setTopSoldProductList] = useState<ProductModel[]>(
    [],
  );

  useEffect(() => {
    Promise.all([getDealProducts(4), getTopSoldProducts(6)])
      .then(([dealResult, topSoldResult]) => {
        setDealProductList(dealResult.result);
        setTopSoldProductList(topSoldResult.result);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Đã xảy ra lỗi khi lấy dữ liệu!');
      });
  }, []);

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
    <div className="container ">
      <div className="row">
        <div className="deals col-lg-9 col-sm-12 mt-3">
          <div className="deals__header">
            <h1 className="deals__title">Siêu sale trong tuần</h1>
          </div>
          <div className="deals__list bg-white row">
            <div
              data-time="00:00"
              className="deals__countdown"
              id="countdowntimer"
            >
              <div className="deals__countdown-title">Kết thúc sau:</div>
              <div className="deals__countdown-item day">
                <span className="num">0</span>
                <span className="word">Ngày</span>
              </div>
              <div className="deals__countdown-item hour">
                <span className="num">0</span>
                <span className="word">Giờ</span>
              </div>
              <div className="deals__countdown-item min">
                <span className="num">0</span>
                <span className="word">Phút</span>
              </div>
              <div className="deals__countdown-item sec">
                <span className="num">0</span>
                <span className="word">Giây</span>
              </div>
            </div>
            {dealProductList.map((product) => (
              <div className="col col-xxl-6 col-xl-6 col-lg-6 col-12">
                <ProductItem key={product.id} product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="top-selling col-lg-3 col-sm-12 mt-3">
          <div className="top-selling__header">
            <h1 className="top-selling__title">BÁN CHẠY NHẤT</h1>
          </div>
          <div className="top-selling__list bg-white">
            {topSoldProductList.map((brand) => (
              <LongWidthProduct key={brand.id} product={brand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealProduct;
