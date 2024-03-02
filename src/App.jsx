import React, { useEffect, useState, useCallback } from 'react'
import { useRoutes } from 'react-router-dom';
import './App.css'
import routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './Context/AuthContext';
import axios from 'axios';
export const IP = "https://shop.ariisco.com"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userInfos, setUserInfos] = useState({});

  const login = (userInfos, token) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem("user", token);
  };

  const logout = useCallback(() => {
    setToken(null);
    setUserInfos({});
    localStorage.removeItem("user");
  });

  useEffect(() => {
    const localStorageData = localStorage.getItem("user");
    if (localStorageData) {
      axios.get(`${IP}`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        }
      })
        .then(response => {
          setIsLoggedIn(true);
          setUserInfos(response.data);
        })
        .catch(error => {
          setIsLoggedIn(false);
          console.error('Error fetching user data:', error);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [login, logout]);



  let router = useRoutes(routes)

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          token,
          userInfos,
          login,
          logout,
        }}>
        {router}
      </AuthContext.Provider>

    </>
  )
}

export default App
