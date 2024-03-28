import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StarRatingProps {
  rating: number;
}

const StarRating = (props: StarRatingProps) => {
  const starArray = [];
  for (let i = 1; i <= 5; i++) {
    starArray.push(
      <FontAwesomeIcon
        key={i} // Thêm key vào đây
        icon={i <= props.rating ? (faStar as IconProp) : (faStar as IconProp)} // Sử dụng farStar cho những sao chưa được đánh giá
        style={{ color: '#f5c31a' }}
      />,
    );
  }
  return <div>{starArray}</div>;
};

export default StarRating;
