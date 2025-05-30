import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
});


// import { createContext } from 'react';


// export const UserContext = createContext(null);



