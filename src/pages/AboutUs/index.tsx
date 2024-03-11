import { Link } from 'react-router-dom';
import Service from '../Home/components/Service';
import Testinomial from '../Home/components/Testimonial';
import './AboutUs.css';
import OnlineTime from './components/OnlineTime';

function AboutUs() {
  return (
    <div className="container mt-5">
      <div className="container p-0">
        {' '}
        <section className="about-us__section py-3 py-md-5">
          <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 col-lg-6 col-xl-5">
              <img
                className="img-fluid rounded"
                style={{ animation: 'leftTo 1.5s ease' }}
                loading="lazy"
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708439167/about_1_z2rk3g.png"
                alt="About 1"
              />
            </div>
            <div className="col-12 col-lg-6 col-xl-7">
              <div className="row justify-content-xl-center">
                <div className="col-12 col-xl-12">
                  <h2
                    className="about-us__title mb-3"
                    style={{ animation: 'rightTo .8s ease' }}
                  >
                    Tech Hub là gì?
                  </h2>
                  <p
                    className="about-us__sub-title lead fs-4 text-secondary mb-3"
                    style={{ animation: 'rightTo 1.3s ease' }}
                  >
                    Tech Hub là điểm đến hàng đầu cho những người đam mê công
                    nghệ và đam mê sáng tạo. Chúng tôi là một cửa hàng trực
                    tuyến chuyên cung cấp các sản phẩm công nghệ hàng đầu, từ
                    điện thoại thông minh, laptop, máy tính bảng đến các phụ
                    kiện điện tử và thiết bị gia dụng thông minh.
                  </p>
                  <p
                    className="about-us__sub-description mb-5"
                    style={{ animation: 'rightTo 1.8s ease' }}
                  >
                    Với cam kết mang lại sự tiện lợi, chất lượng và độ tin cậy
                    cao nhất, Tech Hub không chỉ là một nơi mua sắm, mà còn là
                    người bạn đồng hành đáng tin cậy cho mọi người trong hành
                    trình khám phá công nghệ mới. Với đội ngũ nhân viên giàu
                    kinh nghiệm và niềm đam mê không ngừng, chúng tôi cam kết
                    mang đến trải nghiệm mua sắm trực tuyến tuyệt vời nhất cho
                    mỗi khách hàng, giúp họ khám phá và tận hưởng những tiện ích
                    tối ưu của công nghệ hiện đại.
                  </p>
                  <div className="about-us__prize row gy-4 gy-md-0 gx-xxl-5X">
                    <div className="col-12 col-md-6">
                      <div className="d-flex">
                        <div className="me-4 text-dark">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-gear-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                          </svg>
                        </div>
                        <div className="">
                          <h2 className="h4 mb-3">Thương hiệu đa năng</h2>
                          <p className="text-secondary mb-0">
                            Chúng tôi đang tạo ra một loạt các thiết bị công
                            nghệ tồn tại trong cuộc sống trên mọi phương tiện.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="d-flex">
                        <div className="me-4 text-dark">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-fire"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                          </svg>
                        </div>
                        <div className="">
                          <h2 className="h4 mb-3">Đại lý kỹ thuật số</h2>
                          <p className="text-secondary mb-0">
                            Chúng tôi tin vào sự đổi mới bằng cách kết hợp những
                            ý tưởng cơ bản với những ý tưởng phức tạp.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about-us__section py-3 py-md-5">
          <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 col-lg-6">
              <div className="row justify-content-xl-center">
                <div className="col-12 col-xl-12">
                  <h2
                    className="about-us__title mb-3"
                    style={{ animation: 'leftTo .8s ease' }}
                  >
                    Tại sao nên chọn Tech Hub?
                  </h2>
                  <p
                    className="about-us__sub-title lead fs-4 mb-3 mb-xl-5"
                    style={{ animation: 'leftTo 1.3s ease' }}
                  >
                    Bạn đang tìm kiếm một địa chỉ đáng tin cậy để mua sắm các
                    sản phẩm công nghệ hàng đầu? Hãy để chúng tôi giới thiệu về
                    Tech Hub và lý do tại sao chúng tôi là lựa chọn tuyệt vời
                    cho bạn.
                  </p>
                  <div
                    className="d-flex align-items-center mb-3"
                    style={{ animation: 'leftTo 1.8s ease' }}
                  >
                    <div className="me-3 text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p className="about-us__sub-description fs-5 m-0">
                        Đa dạng sản phẩm
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center mb-3"
                    style={{ animation: 'leftTo 1.9s ease' }}
                  >
                    <div className="me-3 text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p className="about-us__sub-description fs-5 m-0">
                        Chất lượng đảm bảo
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center mb-3"
                    style={{ animation: 'leftTo 2s ease' }}
                  >
                    <div className="me-3 text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p className="about-us__sub-description fs-5 m-0">
                        Giá cả cạnh tranh
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center mb-3"
                    style={{ animation: 'leftTo 2.1s ease' }}
                  >
                    <div className="me-3 text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p className="about-us__sub-description fs-5 m-0">
                        Thanh toán và vận chuyển thuận tiện
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center mb-4 mb-xl-5"
                    style={{ animation: 'leftTo 2.2s ease' }}
                  >
                    <div className="me-3 text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p className="about-us__sub-description fs-5 m-0">
                        Dịch vụ khách hàng xuất sắc
                      </p>
                    </div>
                  </div>
                  <Link to={'/product-list'}>
                    <button
                      type="button"
                      className="btn btn-dark"
                      style={{
                        float: 'right',
                        height: '40px',
                        width: '140px',
                        fontSize: '1.5rem',
                        animation: 'leftTo 2.5s ease',
                      }}
                    >
                      Khám phá ngay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <img
                className="img-fluid rounded"
                style={{ animation: 'rightTo 1.5s ease' }}
                loading="lazy"
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708439344/about_2_apkze5.png"
                alt="About 2"
              />
            </div>
          </div>
        </section>
        <section>
          <h1 className="title">THÀNH VIÊN LÃNH ĐẠO TECH HUB</h1>
          <div className="team-row">
            <div className="member">
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102716/Testinomial_2_hzv7yq.png"
                alt=""
              />
              <h2>Bà. Nguyễn Thúc Thùy Tiên</h2>
              <p>Nhà sáng lập Tech Hub</p>
            </div>
            <div className="member">
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102717/Testinomial_3_gw76vg.png"
                alt=""
              />
              <h2>Ông. Đỗ Kim Lâm</h2>
              <p>Đồng sáng lập, nguyên chủ tịch</p>
            </div>
            <div className="member">
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102715/Testinomial_1_bvftan.jpg"
                alt=""
              />
              <h2>Ông. Huỳnh Trấn Thành</h2>
              <p>Đại cổ đông</p>
            </div>
          </div>
        </section>
      </div>
      <Service />
      <OnlineTime />
      <Testinomial />
    </div>
  );
}

export default AboutUs;
