import { createContext, useReducer, useEffect, useState, useContext } from 'react'
import { useLogin } from '../../Context/AuthContext';
const UserPage = () => {
    const { profile } = useLogin();
    return (
       <div>
           <h1>{profile.fullname}</h1>
       </div>
    );
}

export default UserPage;