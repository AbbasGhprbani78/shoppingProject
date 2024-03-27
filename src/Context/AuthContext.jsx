import { createContext, useState } from "react";


const AuthContext = createContext({
    isLoggedIn: false,
    isRegister: false,
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
        productNumber: null,
        isRegister: false,
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
