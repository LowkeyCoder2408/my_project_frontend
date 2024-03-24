import { FormEvent, useState } from 'react';
import { backendEndpoint } from '../../../utils/Constant';
import { toast } from 'react-toastify';
import ProductModel from '../../../models/ProductModel';

function ProductForm() {
  const [product, setProduct] = useState<ProductModel>({
    id: 0,
    name: '',
    alias: 'sss-sss',
    shortDescription: 'ssss',
    fullDescription: 'sss',
    createdTime: new Date(),
    updatedTime: new Date(),
    enabled: false,
    quantity: 0,
    listedPrice: 0,
    currentPrice: 0,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    mainImage: 'ssss',
    categoryId: 1,
    brandId: 1,
    reviewCount: 0,
    ratingCount: 0,
    averageRating: 0,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    fetch(backendEndpoint + '/product', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Đã thêm sách thành công!');
          setProduct({
            id: 0,
            name: '',
            alias: 'sssss',
            shortDescription: '',
            fullDescription: '',
            createdTime: new Date(),
            updatedTime: new Date(),
            enabled: false,
            quantity: 0,
            listedPrice: 0,
            currentPrice: 0,
            length: 0,
            width: 0,
            height: 0,
            weight: 0,
            mainImage: '',
            categoryId: 1,
            brandId: 1,
            reviewCount: 0,
            ratingCount: 0,
            averageRating: 0,
          });
        } else {
          toast.error('Gặp lỗi khi thêm sách');
        }
      })
      .catch((error) => {
        // Xử lý lỗi kết nối hoặc lỗi server
        console.error('Lỗi kết nối hoặc lỗi server:', error);
        toast.error('Gặp lỗi khi kết nối hoặc lỗi server');
      });
  };

  const handleCurrentPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setProduct({ ...product, currentPrice: newValue, brandId: 3 }); // Cập nhật brandId
  };

  const handleListedPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setProduct({ ...product, listedPrice: newValue });
  };

  return (
    <div className="">
      <h1>THÊM SÁCH</h1>
      <form onSubmit={handleSubmit} action="" className="form">
        <input type="hidden" id="productId" value={product.id} />
        <label htmlFor="productName">Tên sách</label>
        <input
          id="productName"
          type="text"
          className="form-control"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <label htmlFor="productListedPrice">Giá bán</label>
        <input
          id="productListedPrice"
          type="number"
          className="form-control"
          value={product.currentPrice}
          onChange={handleCurrentPriceChange}
          required
        />
        <label htmlFor="productListedPrice">Giá niêm yết</label>
        <input
          type="number"
          className="form-control"
          value={product.listedPrice}
          onChange={handleListedPriceChange}
          required
        />
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}

export default ProductForm;
