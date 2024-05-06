import { useEffect, useState } from 'react';
import OrderDetailModel from '../../../../models/OrderDetailModel';
import FormatPrice from '../../../ProductList/components/ProductProps/FormatPrice';
import ProductModel from '../../../../models/ProductModel';
import { getProductByOrderDetailId } from '../../../../api/ProductAPI';
import './OrderDetailRow.css';

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

  //   useEffect(() => {
  //     const rows = document.querySelectorAll<HTMLTableRowElement>('tr');

  //     let totalPrice = 0;

  //     rows.forEach((row) => {
  //       const priceElement = row.querySelector('td:nth-child(4)');
  //       const quantityElement = row.querySelector('td:nth-child(5)');
  //       const totalPriceElement = row.querySelector('td:nth-child(6)');

  //       if (priceElement && quantityElement && totalPriceElement) {
  //         const price = parseFloat(priceElement.textContent!.replace(/\D/g, ''));
  //         const quantity = parseFloat(quantityElement.textContent!);
  //         const subtotal = price * quantity;
  //         totalPriceElement.textContent = subtotal.toLocaleString();
  //         totalPrice += subtotal;
  //       }
  //     });

  //     const totalElement = document.querySelector<HTMLTableCellElement>(
  //       'tr:last-child td:last-child',
  //     );
  //     if (totalElement) {
  //       totalElement.textContent = totalPrice.toLocaleString();
  //     }
  //   }, []);

  return (
    <>
      <tr>
        <th scope="row">{props.orderNumber}</th>
        <td>
          <img
            src="https://images.olx.com.pk/thumbnails/448365461-600x450.jpeg"
            alt=""
            className="table__img"
          />
        </td>
        <td>{product?.name}</td>
        <td></td>
        <td>{props.orderDetail.quantity}</td>
        <td>
          <FormatPrice price={props.orderDetail.subtotal} />
        </td>
      </tr>
    </>
  );
}

export default OrderDetailRow;
