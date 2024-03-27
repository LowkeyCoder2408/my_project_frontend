import React from 'react';
import './Contact.css';
import OnlineTime from '../AboutUs/components/OnlineTime';

const ContactPage = () => {
  return (
    <div className="container">
      <div className="contact">
        <div className="contact__content">
          <h1 className="contact__heading">Liên Hệ</h1>
          <OnlineTime />
        </div>
        <div className="contact__action row">
          <div className="contact__question col-lg-6 col-md-12 col-sm-12">
            <h2 className="question__heading">Bạn Có Câu Hỏi Nào Không ?</h2>
            <form className="question__form" autoComplete="off">
              <label htmlFor="question-form__name">Họ và tên</label>
              <input
                type="text"
                name="name"
                id="question-form__name"
                placeholder="Vui lòng nhập tên đầy đủ..."
                required
              />
              <label htmlFor="question-form__email">Email</label>
              <input
                type="email"
                name="email"
                id="question-form__email"
                placeholder="Nhập email..."
                required
              />
              <label htmlFor="question-form__phone">Điện thoại</label>
              <input
                type="text"
                name="phone"
                id="question-form__phone"
                placeholder="Nhập số điện thoại..."
                required
              />
              <label htmlFor="question-form__question">Nội dung</label>
              <textarea
                name="question"
                id="question-form__question"
                cols={40}
                rows={4}
                placeholder="Nhập nội dung liên hệ..."
              ></textarea>

              <button type="submit" className="question-form__btn btn btn-dark">
                Gửi
              </button>
            </form>
          </div>
          <div className="contact__map col-lg-6 col-md-12 col-sm-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0887145900892!2d106.71422577487016!3d10.80451718934594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293dceb22197%3A0x755bb0f39a48d4a6!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmggLSBDxqEgc-G7nyAx!5e0!3m2!1svi!2sus!4v1697817013166!5m2!1svi!2sus"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
