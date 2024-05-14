import { useEffect, useState } from 'react';
import BarChartBox from '../../components/BarChartBox';
import BigChartBox from '../../components/BigChartBox';
import ChartBox from '../../components/ChartBox';
import PieChartBox from '../../components/PieCartBox';
import TopBox from '../../components/TopBox';
import './Dashboard.css';
import CustomerModel from '../../../models/CustomerModel';
import { getAllCustomers } from '../../../api/CustomerAPI';
import { getAllProductsNoFilter } from '../../../api/ProductAPI';
import ProductModel from '../../../models/ProductModel';
import { getAllOrders } from '../../../api/ProductOrderAPI';
import OrderModel from '../../../models/OrderModel';
import UserModel from '../../../models/UserModel';
import { getAllUsers } from '../../../api/UserAPI';
import { getRoleByToken, isToken } from '../../../utils/JwtService';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../pages/ProductList/components/Loader';
import { barChartBoxRevenue } from '../../../data';

const Dashboard = () => {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isToken() ||
      (getRoleByToken()?.length === 1 &&
        getRoleByToken()?.includes('Khách hàng'))
    ) {
      navigate('/403-error');
      return;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const productsResult = await getAllProductsNoFilter();
        const customersResult = await getAllCustomers();
        const ordersResult = await getAllOrders();
        const usersResult = await getAllUsers();

        if (isMounted) {
          setProducts(productsResult.result);
          setCustomers(customersResult);
          setOrders(ordersResult);
          setUsers(usersResult);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [products, customers, orders, users]);

  const chartBoxCustomer = {
    color: '#8884d8',
    icon: '/user.svg',
    title: 'Khách Hàng',
    link: '/admin/view-customers',
    number: customers.length,
    dataKey: 'Khách hàng',
    percentage: 45,
    chartData: [
      { name: 'Chủ Nhật', 'Khách hàng': 1400 },
      { name: 'Thứ Hai', 'Khách hàng': 600 },
      { name: 'Thứ Ba', 'Khách hàng': 500 },
      { name: 'Thứ Tư', 'Khách hàng': 700 },
      { name: 'Thứ Năm', 'Khách hàng': 400 },
      { name: 'Thứ Sáu', 'Khách hàng': 500 },
      { name: 'Thứ Bảy', 'Khách hàng': 450 },
    ],
  };

  const chartBoxProduct = {
    color: 'skyblue',
    icon: '/productIcon.svg',
    title: 'Sản Phẩm',
    link: '/admin/view-products',
    number: products.length,
    dataKey: 'sản phẩm',
    percentage: 21,
    chartData: [
      { name: 'Chủ NhậT', 'sản phẩm': 400 },
      { name: 'Thứ Hai', 'sản phẩm': 600 },
      { name: 'Thứ Ba', 'sản phẩm': 500 },
      { name: 'Thứ Tư', 'sản phẩm': 700 },
      { name: 'Thứ Năm', 'sản phẩm': 400 },
      { name: 'Thứ Sáu', 'sản phẩm': 1500 },
      { name: 'Thứ Bảy', 'sản phẩm': 450 },
    ],
  };

  const chartBoxOrder = {
    color: 'gold',
    icon: '/conversionIcon.svg',
    title: 'Đơn Hàng',
    number: orders.length,
    dataKey: 'đơn hàng',
    link: '/admin/view-orders',
    percentage: 12,
    chartData: [
      { name: 'Chủ Nhật', 'đơn hàng': 400 },
      { name: 'Thứ Hai', 'đơn hàng': 600 },
      { name: 'Thứ Ba', 'đơn hàng': 500 },
      { name: 'Thứ Tư', 'đơn hàng': 700 },
      { name: 'Thứ Năm', 'đơn hàng': 11400 },
      { name: 'Thứ Sáu', 'đơn hàng': 500 },
      { name: 'Thứ Bảy', 'đơn hàng': 450 },
    ],
  };

  const chartBoxRevenue = {
    color: 'teal',
    link: '/admin/view-users',
    icon: '/revenueIcon.svg',
    title: 'ĐỘI NGŨ',
    number: users.length,
    dataKey: 'doanh thu',
    percentage: -12,
    chartData: [
      { name: 'Chủ Nhật', 'doanh thu': 400 },
      { name: 'Thứ Hai', 'doanh thu': 600 },
      { name: 'Thứ Ba', 'doanh thu': 500 },
      { name: 'Thứ Tư', 'doanh thu': 700 },
      { name: 'Thứ Năm', 'doanh thu': 400 },
      { name: 'Thứ Sáu', 'doanh thu': 500 },
      { name: 'Thứ Bảy', 'doanh thu': 450 },
    ],
  };

  const barChartBoxVisit = {
    title: 'TRẠNG THÁI ĐƠN HÀNG',
    color: '#FF8042',
    link: '/admin/view-customers',
    dataKey: 'truy cập',
  };

  return (
    <div className="home">
      <div className="home__box home__box1">
        <TopBox />
      </div>
      <div className="home__box home__box2">
        <ChartBox {...chartBoxCustomer} />
      </div>
      <div className="home__box home__box3">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="home__box home__box4">
        <PieChartBox />
      </div>
      <div className="home__box home__box5">
        <ChartBox {...chartBoxOrder} />
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
