import React from 'react';
import ProductCartList from './ProductCartList';

interface ShoppingCartProps {}

const ShoppingCart: React.FC<ShoppingCartProps> = (props) => {
  return <ProductCartList />;
};

export default ShoppingCart;
