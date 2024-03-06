import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { IP } from "../App";

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    refresh: null,
    userInfos: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {

    const [authData, setAuthData] = useState({
        isLoggedIn: false,
        token: null,
        refresh: null,
        userInfos: null,
    });

    // const getAllInfo = async () => {

    //     try {
    //         const response = await axios.get(`${IP}`)
    //         if (response.status === 200) {

    //             console.log(response.data)
    //             setAllData(response.data)
    //         }

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

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
