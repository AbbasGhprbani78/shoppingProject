import { createContext, useEffect, useState } from "react";


const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    refresh: null,
    userInfos: null,
    login: () => { },
    logout: () => { },
    data: null,
});

export const AuthProvider = ({ children }) => {

    const [authData, setAuthData] = useState({
        isLoggedIn: false,
        token: null,
        refresh: null,
        userInfos: null,
        data: null,
    });


    const login = () => {

    };

    const logout = () => {

    };

    return (
        <AuthContext.Provider value={{ ...authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
