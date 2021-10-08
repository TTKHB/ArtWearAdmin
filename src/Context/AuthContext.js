import { createContext, useReducer, useEffect, useState, useContext } from 'react'

import client from "./Constants";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});
    // fetchUser 
    const fetchUser = async () => {
        const token = await localStorage.getItem('token');
        if (token !== null) {
            // client is link axios
            const res = await client.get('/profile', {
                headers: {
                    Authorization: `JWT ${token}`
                }
            })
            // Set profile when login true
            if (res.data.success) {
                setProfile(res.data.profile)
                setIsLoggedIn(true)
            // else false
            } else {
                setProfile({})
                setIsLoggedIn(false)
            }
        } else {
            setProfile({})
            setIsLoggedIn(false)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            profile,
            setProfile,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
// const biến useLogin sử dụng AuthContext (bóc useLogin sang file Login để sử dụng)
export const useLogin = () => useContext(AuthContext)

export default AuthContextProvider







