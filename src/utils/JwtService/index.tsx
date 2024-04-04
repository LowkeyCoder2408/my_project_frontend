import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../pages/Admin/AdminRequirement';
export function isTokenExpired(token: string) {
  const decodedToken = jwtDecode(token);

  if (!decodedToken.exp) {
    // Token không có thời gian hết hạn (exp)
    return false;
  }

  const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây

  return currentTime < decodedToken.exp;
}

export function isToken() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
}

export function getAvatarByToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload;
    return decodedToken.avatar;
  }
}

export function getFullNameByToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload;
    console.log(decodedToken);
    return decodedToken.fullName;
  }
}

export function getEmailByToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload;
    return decodedToken.email;
  }
}

export function getUserIdByToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload;
    return decodedToken.id;
  }
}

export function getRoleByToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload;
    return decodedToken.role;
  }
}

export function logout(navigate: any) {
  navigate('/login');
  localStorage.removeItem('token');
  localStorage.removeItem('cart');
}
