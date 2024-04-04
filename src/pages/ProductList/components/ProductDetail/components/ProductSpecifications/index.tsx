import React, { useEffect, useRef, useState } from 'react';
import ProductModel from '../../../../../../models/ProductModel';
import './ProductSpecifications.css';
import BrandModel from '../../../../../../models/BrandModel';
import Loader from '../../../Loader';
import { getBrandByAlias } from '../../../../../../api/BrandAPI';
import CategoryModel from '../../../../../../models/CategoryModel';
import {
  getCategoryByProductAlias,
  getCategoryByProductId,
} from '../../../../../../api/CategoryAPI';
import { format } from 'date-fns';

interface ProductSpecificationsProps {
  product: ProductModel;
}

function ProductSpecifications(props: ProductSpecificationsProps) {
  const [brand, setBrand] = useState<BrandModel | null>(null);
  const [category, setCategory] = useState<CategoryModel | null>(null);
  const [error, setError] = useState<any>(null);
  let [rowCount, setRowCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.product.alias) {
      getBrandByAlias(props.product.alias)
        .then((result) => {
          setBrand(result.brand);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [props.product.alias]);

  useEffect(() => {
    if (props.product.alias) {
      getCategoryByProductAlias(props.product.alias)
        .then((result) => {
          setCategory(result.category);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [props.product.alias]);

  useEffect(() => {
    // Cập nhật số hàng đã render mỗi khi props.product thay đổi
    setRowCount(0);
  }, [props.product]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="product-details__specifications__wrapper mt-3">
      <div className="product-details__specifications__heading">
        <strong>THÔNG SỐ KỸ THUẬT</strong>
      </div>
      <table className="table mt-5">
        <tbody>
          {props.product.length !== 0 &&
            props.product.width === 0 &&
            props.product.height === 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều dài
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.length} cm
                </td>
              </tr>
            )}
          {props.product.length === 0 &&
            props.product.width !== 0 &&
            props.product.height === 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều rộng
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.width} cm
                </td>
              </tr>
            )}
          {props.product.length === 0 &&
            props.product.width === 0 &&
            props.product.height !== 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều cao
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.height} cm
                </td>
              </tr>
            )}
          {props.product.length !== 0 &&
            props.product.width !== 0 &&
            props.product.height === 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều dài x chiều rộng
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.length} cm x {props.product.width} cm
                </td>
              </tr>
            )}
          {props.product.length !== 0 &&
            props.product.width === 0 &&
            props.product.height !== 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều dài x chiều cao
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.length} cm x {props.product.height} cm
                </td>
              </tr>
            )}
          {props.product.length === 0 &&
            props.product.width !== 0 &&
            props.product.height !== 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều rộng x chiều cao
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.width} cm x {props.product.height} cm
                </td>
              </tr>
            )}
          {props.product.length !== 0 &&
            props.product.width !== 0 &&
            props.product.height !== 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Kích thước
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.length} cm x {props.product.width} cm x{' '}
                  {props.product.height} cm
                </td>
              </tr>
            )}
          {props.product.weight !== 0 && (
            <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
              <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                Trọng lượng
              </td>
              <td style={{ width: '60%', paddingLeft: '20px' }}>
                {props.product.weight} g
              </td>
            </tr>
          )}
          {category !== null && (
            <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
              <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                Danh mục
              </td>
              <td style={{ width: '60%', paddingLeft: '20px' }}>
                {category.name}
              </td>
            </tr>
          )}
          {brand !== null && (
            <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
              <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                Thương hiệu
              </td>
              <td style={{ width: '60%', paddingLeft: '20px' }}>
                {brand.name}
              </td>
            </tr>
          )}
          {props.product.operatingSystem !== '' &&
            props.product.operatingSystem !== undefined && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Hệ điều hành
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.operatingSystem}
                </td>
              </tr>
            )}
          {props.product.createdTime && (
            <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
              <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                Ngày nhập hàng
              </td>
              <td style={{ width: '60%', paddingLeft: '20px' }}>
                {format(props.product.createdTime, 'dd/MM/yyyy')}, lúc{' '}
                {format(props.product.createdTime, 'HH:mm')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductSpecifications;
