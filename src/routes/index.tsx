// Pages
import { useLocation } from 'react-router-dom';
import AboutUs from '../pages/AboutUs';
import CheckoutStatus from '../pages/Checkout/components/CheckoutStatus';
import Contact from '../pages/Contact';
import ExchangeReturnRefundPolicy from '../pages/ExchangeReturnRefundPolicy';
import FAQ from '../pages/FAQ';
import Home from '../pages/Home';
import MyOrder from '../pages/MyOrder';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductList/components/ProductDetail';
import SecurityPolicy from '../pages/SecurityPolicy';
import ShippingPolicy from '../pages/ShippingPolicy';
import ShoppingCart from '../pages/ShoppingCart';
import EnableAccount from '../pages/User/EnableAccount';
import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import Test from '../pages/User/Test';
import Error403 from '../pages/ValidatePage/Error403';
import Error404 from '../pages/ValidatePage/Error404';
import WarrantyPolicy from '../pages/WarrantyPolicy';
import Wishlist from '../pages/Wishlist';
import { AdminLayout } from '../components/GlobalStyles/Layout';
import { Fragment } from 'react';
import Dashboard from '../admin/pages/Dashboard';

// const location = useLocation();
// const isAdminPath = location.pathname.startsWith('/admin');

const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: 'default',
  },
  {
    path: '/product-list',
    component: ProductList,
    layout: 'default',
  },
  {
    path: '/product-list/:categoryId',
    component: ProductList,
    layout: 'default',
  },
  {
    path: '/product/:productAlias',
    component: ProductDetail,
    layout: 'default',
  },
  {
    path: '/about-us',
    component: AboutUs,
    layout: 'default',
  },
  {
    path: '/faq',
    component: FAQ,
    layout: 'default',
  },
  {
    path: '/contact',
    component: Contact,
    layout: 'default',
  },
  {
    path: '/security-policy',
    component: SecurityPolicy,
    layout: 'default',
  },
  {
    path: '/shipping-policy',
    component: ShippingPolicy,
    layout: 'default',
  },
  {
    path: '/warranty-policy',
    component: WarrantyPolicy,
    layout: 'default',
  },
  {
    path: '/exchange-return-refund-policy',
    component: ExchangeReturnRefundPolicy,
    layout: 'default',
  },
  {
    path: '/login',
    component: Login,
    layout: 'default',
  },
  {
    path: '/register',
    component: Register,
    layout: 'default',
  },
  {
    path: '/shopping-cart',
    component: ShoppingCart,
    layout: 'default',
  },
  {
    path: '/enable/:email/:verificationCode',
    component: EnableAccount,
    layout: 'default',
  },
  {
    path: '/check-out/status',
    component: CheckoutStatus,
    layout: 'default',
  },
  {
    path: '/wish-list',
    component: Wishlist,
    layout: 'default',
  },
  {
    path: '/my-order',
    component: MyOrder,
    layout: 'default',
  },
  {
    path: '/test',
    component: Test,
    layout: 'default',
  },
  {
    path: '/403-error',
    component: Error403,
    layout: 'default',
  },
  {
    path: '*',
    component: Error404,
    layout: 'none',
  },
];

// Login as admin to access
const privateRoutes: any[] = [
  {
    path: '/admin/dashboard',
    component: Dashboard,
    layout: 'admin',
  },
  {
    path: '*',
    component: Error404,
    layout: 'none',
  },
];

export { privateRoutes, publicRoutes };
