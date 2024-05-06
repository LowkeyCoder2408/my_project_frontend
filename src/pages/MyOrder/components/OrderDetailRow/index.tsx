import { useEffect, useState } from 'react';
import OrderDetailModel from '../../../../models/OrderDetailModel';
import FormatPrice from '../../../ProductList/components/ProductProps/FormatPrice';
import ProductModel from '../../../../models/ProductModel';
import { getProductByOrderDetailId } from '../../../../api/ProductAPI';
import './OrderDetailRow.css';
import { Link } from 'react-router-dom';

interface OrderDetailRowProps {
  orderNumber: number;
  orderDetail: OrderDetailModel;
}

function OrderDetailRow(props: OrderDetailRowProps) {
  const [product, setProduct] = useState<ProductModel | null>(null);

  useEffect(() => {
    getProductByOrderDetailId(props.orderDetail.id)
      .then((result) => {
        setProduct(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <tr className="order-detail__row">
      <th scope="row">{props.orderNumber}</th>
      <td>
        <Link to={`/product/${product?.alias}`}>
          <img src={product?.mainImage} alt="" className="table__img" />
        </Link>
      </td>
      <td>{product?.name}</td>
      <td>
        <FormatPrice price={product?.currentPrice} />
      </td>
      <td>{props.orderDetail.quantity}</td>
      <td>
        <FormatPrice price={props.orderDetail.subtotal} />
      </td>
    </tr>
  );
}

export default OrderDetailRow;
