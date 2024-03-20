import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

function Test() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = jwtDecode(token);
      console.log(userData);
      if (userData) {
        setEmail(userData.sub + '');
      }
    }
  }, []);

  return <>{email && <div>Xin chào, {email} </div>}</>;
}

export default Test;
