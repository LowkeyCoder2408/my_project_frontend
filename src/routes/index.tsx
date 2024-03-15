// Pages
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
import ExchangeReturnRefundPolicy from '../pages/ExchangeReturnRefundPolicy';
import FAQ from '../pages/FAQ';
import Home from '../pages/Home';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductList/components/ProductDetail';
import SecurityPolicy from '../pages/SecurityPolicy';
import ShippingPolicy from '../pages/ShippingPolicy';
import EnableAccount from '../pages/User/EnableAccount';
import Register from '../pages/User/Register';
import WarrantyPolicy from '../pages/WarrantyPolicy';
// Layouts
// import { HeaderOnly } from '../components/GlobalStyles/Layout';

// Public accession
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
    path: '/register',
    component: Register,
    layout: 'default',
  },
  {
    path: '/enable/:email/:verificationCode',
    component: EnableAccount,
    layout: 'default',
  },
];

// Login to access
const privateRoutes: any[] = [];

export { privateRoutes, publicRoutes };
