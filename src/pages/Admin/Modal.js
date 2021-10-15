import React from "react";
import '../Admin/Admin.css'

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
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
          <h1>Thành công rồi</h1>
        </div>
        <div className="body">
          <p>Cập nhật thông tin thành công!</p>
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

export default Modal;