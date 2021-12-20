import "./Conversation.css"
import { createContext, useReducer, useEffect, useState, useContext } from 'react';
import axios from "axios";
export default function Conversation({conversation, currentUser}){
    const [user,setUser]=useState(null)

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);
        const getUser = async () => {
          try {
            const res = await axios("http://localhost:3000/api/v1/users/" + friendId);
            setUser(res.data);
            console.log("abcd",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [currentUser, conversation]);

    return(
        <div className="conversation" >
             <img className="conversationImg" 
             src={
                user
                ? user.avatar ||
                "https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
                : "https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
             } 
             alt=""/>
             <span className="conversationName">{user ? user.fullname:''}</span>
        </div>
    )
}