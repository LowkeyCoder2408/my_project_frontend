import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useEffect, useState } from 'react';
import { backendEndpoint } from '../../../utils/Constant';
import { toast } from 'react-toastify';
import { useAuth } from '../../../utils/AuthContext';

function Login() {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const jwtToken = localStorage.getItem('token');
  const { isLoggedIn, setLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigation('/');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const loginRequest = { email, password };
      const response = await fetch(`${backendEndpoint}/account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });

      if (response.ok) {
        const data = await response.json();
        const { jwt } = data;
        localStorage.setItem('token', jwt);
        toast.success('Đăng nhập thành công');
        window.location.href = '/';
      } else {
        toast.error('Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Đăng nhập thất bại: ', error);
      toast.error('Đăng nhập thất bại');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (jwtToken !== null) {
    return null;
  }

  return (
    <div className="login__container container">
      <div className="row">
        <div className="login__form col col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12">
          <h1 className="login__form-title text-center mt-5">
            <strong>ĐĂNG NHẬP</strong>
          </h1>
          <div className="mt-3 mb-5">
            <form className="form" autoComplete="off">
              <div className="row mb-0">
                <div className="login__input-box__field col col-xxl-12 col-xl-12 col-lg-12  col-md-12">
                  <div className="login__input-box">
                    <input
                      required
                      type="text"
                      id="email"
                      value={email}
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <span>Email</span>
                  </div>
                </div>
                <div className="register__input-box__field col col-12">
                  <div className="register__input-box">
                    <input
                      required
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Mật khẩu</span>
                  </div>
                </div>
              </div>
              <label htmlFor="remember-me" className="d-flex gap-2 mt-3">
                <input id="remember-me" type="checkbox" value="remember-me" />
                Ghi nhớ tài khoản
              </label>
              <button
                className="container-fluid py-2 btn btn-primary mt-3"
                type="button"
                onClick={handleLogin}
                style={{ fontSize: '1.6rem' }}
              >
                ĐĂNG NHẬP
              </button>
              <div className="login__transfer mb-4">
                <span>
                  Bạn chưa có tài khoản? Vui lòng chọn{' '}
                  <Link to={'/register'}>Đăng ký</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="login__logo col col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 d-flex flex-column justify-content-center align-items-center">
          <img
            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1707592447/logo_main_tes0gp.png"
            alt=""
          />
          <h3>
            <strong>Tech Solutions, Hub Excellence</strong>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
