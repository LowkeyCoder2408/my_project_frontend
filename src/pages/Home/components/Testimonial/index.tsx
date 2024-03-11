import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Testinomial.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function Testinomial() {
  return (
    <div className="container" style={{ marginTop: '60px' }}>
      <h2 className="my-5">
        <strong>KHÁCH HÀNG NÓI GÌ VỀ TECH HUB?</strong>
      </h2>
      <div className="testimonial__wrapper my-5">
        <div className="testimonial__box">
          <i className="fas fa-quote-left quote"></i>
          <p>
            Sự đa dạng về sản phẩm giống như sự đa tài trên sân cỏ. Thời gian
            giao hàng nhanh như gia tốc chạy của tôi, và chất lượng sản phẩm như
            những đường chuyền chính xác. Đó là một đối tác mua sắm ưu việt,
            giống như mối liên kết giữa các cầu thủ trên sân!
          </p>
          <div className="testimonial__content">
            <div className="info">
              <div className="name">Lionel Andrés Messi</div>
              <div className="job">Siêu sao | Cầu thủ</div>
              <div className="stars">
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
              </div>
            </div>
            <div className="testimonial__image">
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102717/Testinomial_3_gw76vg.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="testimonial__box">
          <i className="fas fa-quote-left quote"></i>
          <p>
            Amazing gút chóp. Thật sự ấn tượng với sự đa dạng của dịch vụ chăm
            sóc khách hàng. Giao diện trang web dễ sử dụng, giúp tôi nhanh chóng
            tìm kiếm và có thông tin chi tiết về sản phẩm. Sự hỗ trợ nhanh nhạy
            giúp tạo nên trải nghiệm mua sắm tuyệt vời.
          </p>
          <div className="testimonial__content">
            <div className="info">
              <div className="name">Huỳnh Trấn Thành</div>
              <div className="job">Đạo diễn | Diễn viên</div>
              <div className="stars">
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
              </div>
            </div>
            <div className="testimonial__image">
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102715/Testinomial_1_bvftan.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="testimonial__box">
          <i className="fas fa-quote-left quote"></i>
          <p>
            Sản phẩm tại Tech Hub vô cùng ấn tượng! Chất lượng giao hàng xuất
            sắc, đóng gói cẩn thận, và thời gian giao hàng nhanh chóng. Tôi rất
            hài lòng với trải nghiệm mua sắm của mình. Đây là địa chỉ đáng tin
            cậy cho những nhu cầu mua sắm trực tuyến!
          </p>
          <div className="testimonial__content">
            <div className="info">
              <div className="name">Nguyễn Thúc Thùy Tiên</div>
              <div className="job">Youtuber | Người mẫu</div>
              <div className="stars">
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
                <FontAwesomeIcon icon={faStar as IconProp} />
              </div>
            </div>
            <div className="testimonial__image">
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102716/Testinomial_2_hzv7yq.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testinomial;
