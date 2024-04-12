import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StarRatingProps {
  rating: number;
}

const StarRating = (props: StarRatingProps) => {
  const starArray = [];
  const fullStars = Math.floor(props.rating); // Số lượng ngôi sao đầy
  const hasHalfStar = props.rating - fullStars >= 0.5; // Kiểm tra xem có nửa ngôi sao không

  // Tạo ngôi sao đầy
  for (let i = 1; i <= fullStars; i++) {
    starArray.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar as IconProp}
        style={{ color: '#f5c31a' }}
      />,
    );
  }

  // Thêm nửa ngôi sao nếu cần
  if (hasHalfStar) {
    starArray.push(
      <FontAwesomeIcon
        key={starArray.length + 1} // Đảm bảo key là duy nhất
        icon={faStarHalfAlt as IconProp}
        style={{ color: '#f5c31a' }}
      />,
    );
  }

  // Đảm bảo tổng số ngôi sao không vượt quá 5
  while (starArray.length < 5) {
    starArray.push(
      <FontAwesomeIcon
        key={starArray.length + 1} // Đảm bảo key là duy nhất
        icon={faStar as IconProp}
        style={{ color: '#f5c31a' }}
      />,
    );
  }

  return <div>{starArray}</div>;
};

export default StarRating;
