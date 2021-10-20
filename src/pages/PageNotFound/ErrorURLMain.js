import React from 'react';
import { Link } from 'react-router-dom';
import ImageNotFound from '../../assets/images/errorNotFound.jpg';
import '../PageNotFound/Error.css'
const ErrorErrorURLMain = () => (
  <div className="ContainerURLMain">
    <div className="imageURLMain">
      <img src={ImageNotFound} />
    </div>
    <div className="textErrorMain">
      <h1>404 - Not Found </h1>
      <h2>Rất tiếc! File rỗng rồi   </h2>
      <h3>Kiểm tra lại đường dẫn trong trang chủ ArtWear hoặc bấm vào thanh menu bên trái.</h3>
    </div>
  </div>
);

export default ErrorErrorURLMain;