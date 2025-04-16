import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({children}){

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    const isAdmin = user?.role === 'admin';
    const isUser = user?.role === 'user';

    async function fetchUserData() {
        const res = await fetch('/api/user', {
            headers: {Authorization: `Bearer ${token}`}
        })

        const data = await res.json();
        if(res.ok){
            setUser(data); //Expose the user data to the context
        }
    }

    useEffect(() => {
        if(token){

            fetchUserData();
        }
    },[token]);

    return(
        <AuthContext.Provider value={{ token, setToken, user, setUser, isAdmin, isUser}}>
            {children}
        </AuthContext.Provider>
    )
}

