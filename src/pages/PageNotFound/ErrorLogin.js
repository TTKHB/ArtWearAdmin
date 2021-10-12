import React from 'react';
import { Link } from 'react-router-dom';
import ImageErrorLogin from '../../assets/images/errorLogin.jpg';
import '../PageNotFound/Error.css'
const ErrorLogin = () => (
  <div className="Container">
    <div className="imageError">
      <img src={ImageErrorLogin} />
    </div>
    <div className="textError">
      <h1>404 - Not Found </h1>
      <h2>Rất tiếc! bạn chưa đăng nhập vào ArtWear </h2>
      <Link to="/login">
        <h3>Quay về đăng nhập</h3>
      </Link>
    </div>
  </div>
);

export default ErrorLogin;