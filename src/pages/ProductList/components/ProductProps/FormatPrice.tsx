import React from 'react';

interface FormatPriceProps {
  price?: number;
}

const FormatPrice: React.FC<FormatPriceProps> = ({ price }) => {
  if (price === undefined) {
    return <span>Giá chưa cập nhật</span>;
  }
  if (price === 0) {
    return <span>Miễn phí</span>;
  }
  return (
    <span>
      {new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price)}
    </span>
  );
};

export default FormatPrice;
