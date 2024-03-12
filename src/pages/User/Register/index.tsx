import { ChangeEvent, useState } from 'react';
import { backendEndpoint } from '../../../utils/Constant';
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function Register() {
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('Chưa điền thông tin');
  const [fullNameError, setFullNameError] = useState<string>(
    'Chưa điền thông tin',
  );
  const [phoneNumberError, setPhoneNumberError] = useState<string>(
    'Chưa điền thông tin',
  );
  const [passwordError, setPasswordError] = useState<string>(
    'Chưa điền thông tin',
  );
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>(
    'Chưa điền thông tin',
  );

  const handleSubmit = async (e: React.FormEvent) => {};

  const checkExistingEmail = async (email: string) => {
    const endpoint =
      backendEndpoint + `/customer/search/existsByEmail?email=${email}`;
    try {
      const response = await fetch(endpoint);
      const responseData = await response.text();
      if (responseData === 'true') {
        setEmailError('Email đã tồn tại');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Đã xảy ra lỗi trong quá trình kiểm tra email', error);
      return false;
    }
  };

  const checkValidEmail = async (email: string) => {
    const emailRegex =
      /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\w-]+(?:\.[\w-]+)*|\[(?:\d{1,3}\.){3}\d{1,3}\])$/;
    if (!emailRegex.test(email)) {
      setEmailError('Email không đúng định dạng');
      return true;
    } else {
      setEmailError('');
      return false;
    }
  };

  const handleEmailChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
    checkValidEmail(e.target.value);
    checkExistingEmail(e.target.value);
  };

  const checkPassword = async (password: string) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Không đúng định dạng');
      return true;
    } else {
      setPasswordError('');
      return false;
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
    return checkPassword(e.target.value);
  };

  const checkRepeatPassword = async (repeatPassword: string) => {
    if (repeatPassword !== password) {
      setRepeatPasswordError('Mật khẩu không trùng khớp.');
      return true;
    } else {
      setRepeatPasswordError('');
      return false;
    }
  };

  const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
    setRepeatPasswordError('');
    return checkRepeatPassword(e.target.value);
  };

  return (
    <div className="register__container container">
      <div className="row">
        <div className="register__logo col col-xxl-5 col-xl-5 col-lg-12 col-md-12 col-12 d-flex flex-column justify-content-center align-items-center">
          <img
            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1707592447/logo_main_tes0gp.png"
            alt=""
          />
          <h3>
            <strong>Tech Solutions, Hub Excellence</strong>
          </h3>
        </div>
        <div className="register__form col col-xxl-7 col-xl-7 col-lg-12 col-md-12 col-12">
          <h1 className="register__form-title text-center my-5">
            <strong>TẠO TÀI KHOẢN MỚI</strong>
          </h1>
          <div className="mt-5">
            <form onSubmit={handleSubmit} className="form">
              <div className="row">
                <div className="input-box__field col col-xxl-12 col-xl-12 col-lg-12  col-md-12">
                  <div className="input-box">
                    <input
                      required
                      type="text"
                      id="email"
                      className=""
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <span>Email</span>
                    <div className="d-flex">
                      {emailError && (
                        <div className="register__error">
                          {emailError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="input-box__field col col-xxl-6 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="input-box">
                    <input
                      required
                      type="text"
                      id="fullName"
                      className=""
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <span>Họ và tên</span>{' '}
                    <div className="d-flex">
                      {fullNameError && (
                        <div className="register__error">
                          {fullNameError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="input-box__field col col-xxl-6 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="input-box">
                    <input
                      required
                      type="text"
                      id="phoneNumber"
                      className=""
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <span>Số điện thoại</span>
                    <div className="d-flex">
                      {phoneNumberError && (
                        <div className="register__error">
                          {phoneNumberError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="input-box__field col col-12">
                  <div className="input-box">
                    <input
                      required
                      type="password"
                      id="password"
                      className=""
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <span>Mật khẩu</span>
                    <div className="d-flex">
                      {passwordError && (
                        <div className="register__error">
                          {passwordError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="input-box__field col col-12">
                  <div className="input-box">
                    <input
                      required
                      type="password"
                      id="repeatPassword"
                      className=""
                      value={repeatPassword}
                      onChange={handleRepeatPasswordChange}
                    />
                    <span>Nhập lại mật khẩu</span>
                    {repeatPasswordError && (
                      <div className="register__error">
                        {repeatPasswordError}
                        <FontAwesomeIcon
                          icon={faTriangleExclamation as IconProp}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="container-fluid py-2 btn btn-primary"
                type="submit"
                style={{ fontSize: '1.6rem' }}
              >
                ĐĂNG KÝ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
