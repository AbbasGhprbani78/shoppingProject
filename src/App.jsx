import React, { useEffect, useState, useCallback } from 'react'
import { useRoutes } from 'react-router-dom';
import './App.css'
import routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './Context/AuthContext';
import axios from 'axios';
// export const IP = "http://185.79.156.226:8500"
export const IP = "https://shop.ariisco.com"
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [userInfos, setUserInfos] = useState(null);
  const [data, setdata] = useState(null)

  const login = (data) => {
    setToken(data.access);
    setIsLoggedIn(true);
    setUserInfos({
      firstName: data.first_name,
      lastName: data.last_name
    });
    setRefresh(data.refresh)
    localStorage.setItem("user", data.access);
    localStorage.setItem("refresh", data.refresh)
  };

  const logout = useCallback(() => {
    setToken(null);
    setRefresh(null)
    setUserInfos(null);
    setIsLoggedIn(false)
    localStorage.removeItem("user");
    localStorage.removeItem("refresh");
  });

  const checkUser = async () => {
    const localStorageData = localStorage.getItem("refresh");
    if (localStorageData) {
      const body = {
        refresh: localStorageData,
      };
      try {
        const response = await axios.post(`${IP}/user/token/refresh/`, body)
        if (response.status === 200) {
          setToken(response.data.access)
          setIsLoggedIn(true);
          setUserInfos({
            firstName: data.first_name,
            lastName: data.last_name
          });

          localStorage.setItem("user", response.data.access);
        }
      } catch (error) {
        console.log(error.mesage)
      }
    } else {
      setIsLoggedIn(false);
      setToken(null)
      setRefresh(null)
      setUserInfos(null)
      localStorage.removeItem("user")
      localStorage.removeItem("refresh")
    }
  }

  const getProductsHome = async () => {
    try {
      const response = await axios.get(`${IP}/product/home/`)
      if (response.status === 200) {
        setdata(response.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getProductsHome()
  }, [])

  useEffect(() => {
    checkUser()
  }, [])

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
          refresh,
          data
        }}>
        {router}
      </AuthContext.Provider>

    </>
  )
}

export default App
