import { createContext, useEffect, useState } from "react";


const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    refresh: null,
    userInfos: null,
    login: () => { },
    logout: () => { },
    data: null,
    numberBoughtProduct: () => { },
    productNumber: null
});

export const AuthProvider = ({ children }) => {

    const [authData, setAuthData] = useState({
        isLoggedIn: false,
        token: null,
        refresh: null,
        userInfos: null,
        data: null,
        productNumber: null
    });


    const login = () => {

    };

    const logout = () => {

    };

    const numberBoughtProduct = () => {

    };

    return (
        <AuthContext.Provider value={{ ...authData, login, logout, numberBoughtProduct }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
