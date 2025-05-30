import { useEffect, useState } from 'react';
import { AuthContext } from './context'; // adjust path as needed

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {

        const storedvalue = localStorage.getItem('isLoggedIn');
        return storedvalue ? JSON.parse(storedvalue) : false;

    });
    const [accessToken, setAccessToken] = useState(null)

    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn))
    }, [isLoggedIn]);



    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
