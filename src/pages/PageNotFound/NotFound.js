import React from 'react';
import { Link } from 'react-router-dom';
import ImageNotFound from '../../assets/images/errorNotFound.jpg';
import '../PageNotFound/Error.css'
const ErrorLogin = () => (
  <div className="ContainerNotFound">
    <div className="imageNotFound">
      <img src={ImageNotFound} />
    </div>
    <div className="textError">
      <h1>404 - Not Found </h1>
      <h2>Rất tiếc! Không tìm thấy địa chỉ URL bạn yêu cầu.</h2>
    </div>
  </div>
);

export default ErrorLogin;