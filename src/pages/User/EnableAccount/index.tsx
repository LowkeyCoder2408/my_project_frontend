import { useParams } from 'react-router-dom';
import './EnableAccount.css';
import { useEffect, useState } from 'react';
import { backendEndpoint } from '../../../utils/Constant';

function EnableAccount() {
  const { email } = useParams();
  const { verificationCode } = useParams();
  const [isEnabled, setIsEnabled] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (email && verificationCode) {
      handleEnable();
    }
  }, []);

  const handleEnable = async () => {
    try {
      const endpoint: string =
        backendEndpoint +
        `/account/enable?email=${email}&verificationCode=${verificationCode}`;
      const response = await fetch(endpoint, {
        method: 'GET',
      });

      if (response.ok) {
        setIsEnabled(true);
      } else {
        setNotification(response.text + '');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Kích hoạt tài khoản</h1>
      {isEnabled ? (
        <p>Tài khoản kích hoạt thành công, đăng nhập để tiếp tục!</p>
      ) : (
        <p>{notification}</p>
      )}
    </div>
  );
}

export default EnableAccount;
