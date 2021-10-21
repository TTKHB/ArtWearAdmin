import React from "react";
import '../Admin/Admin.css'

function ModalLoginError ({ setOpenModal }) {
  return (
    <div className="modalLoginError">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1 style={{color:'black',fontSize:40}}>Đăng nhập thất bại</h1>
        </div>
        <div className="body">
          <p>Tài khoản hoặc mật khẩu không chính xác!</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="BtnSuccess"
          >
            Tiếp tục
          </button>

        </div>
      </div>
    </div>
  );
}

export default ModalLoginError;