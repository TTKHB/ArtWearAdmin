import "./Message.css";
import { format } from "timeago.js";
import { createContext, useReducer, useEffect, useState, useContext } from 'react';
import axios from "axios";

export default function Message({ own, message, currentUser }) {

  console.log("id admin ne", message.sender)
  const [user, setUser] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/` + message.sender)
      .then(res => {
        console.log("tat ca nguoi dung", res.data)
        setUser(res.data)
      })
      .catch(error => {
        console.log('Api call error');
      });
  }, []);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            user
              ? user.avatar ||
              "https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
              : "https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
          }
          alt=""
        />
        <p className="messageText">
          {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.dateCreate)}</div>
    </div>
  );
}