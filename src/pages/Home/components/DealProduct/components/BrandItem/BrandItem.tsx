import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './BrandItem.css';
import BrandModel from '../../../../../../models/BrandModel';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface BrandItemProps {
  brand: BrandModel;
}

const BrandItem = (props: BrandItemProps) => {
  return (
    <div className="gallery-brand bg-white">
      <div className="gallery-brand__icon">
        <img src={props.brand.logo} alt="Brand Logo" />
      </div>
      <div className="gallery-brand__info">
        <div className="info__collection">
          <a href="#">{props.brand.name}</a>
          <span className="count"> (42 sản phẩm)</span>
        </div>
        <div className="info__rate">
          <div className="rating">
            <div
              className="rating__stars"
              role="img"
              aria-label="4.0 out of 5.0 stars"
            >
              <FontAwesomeIcon
                icon={solidStar as IconProp}
                className="star-icon"
              />
              <FontAwesomeIcon
                icon={solidStar as IconProp}
                className="star-icon"
              />
              <FontAwesomeIcon
                icon={solidStar as IconProp}
                className="star-icon"
              />
              <FontAwesomeIcon
                icon={regularStar as IconProp}
                className="star-icon"
              />
              <FontAwesomeIcon
                icon={regularStar as IconProp}
                className="star-icon"
              />
            </div>
            <span className="rating__caption show">{42}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandItem;
