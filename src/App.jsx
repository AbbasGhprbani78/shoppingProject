import React, { useEffect, useState, useCallback } from 'react'
import { useRoutes } from 'react-router-dom';
import './App.css'
import routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './Context/AuthContext';
import axios from 'axios';
import { SearchProvider } from './Context/SearchContext';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
// export const IP = "http://185.79.156.226:9500"
export const IP = "https://shop.ariisco.com"
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [userInfos, setUserInfos] = useState(null);
  const [data, setdata] = useState(null)
  const [productNumber, setProductNumber] = useState(null)
  const [informationCo, setInformationCo] = useState([])
  const [allProduct, setAllProduct] = useState(null);

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

  const getAllProductBasket = async () => {
    const access = localStorage.getItem("user")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/product/cart-detail/`, {
        headers
      })
      if (response.status === 200) {
        setAllProduct(response.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const numberBoughtProduct = async () => {

    const access = localStorage.getItem("user")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/product/cart-count/`, {
        headers
      })
      if (response.status === 200) {
        setProductNumber(response.data.total_products_in_cart)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

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
          numberBoughtProduct()
        }
      } catch (error) {
      }
    } else {
      setIsLoggedIn(false);
      setToken(null)
      setRefresh(null)
      setUserInfos(null)
      localStorage.removeItem("user")
      localStorage.removeItem("refresh")
      setProductNumber(null)
    }
  }

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
    numberBoughtProduct()
    getAllProductBasket()
  };

  const logout = useCallback(() => {
    setToken(null);
    setRefresh(null)
    setUserInfos(null);
    setIsLoggedIn(false)
    localStorage.removeItem("user");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_id")
    setProductNumber(null)
    setAllProduct(null)
  });


  const getInfoCo = async () => {

    try {
      const response = await axios.get(`${IP}/product/brand-info/`, {

      });

      if (response.status === 200) {
        setInformationCo(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductsHome()
  }, [])

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    numberBoughtProduct()
  }, [productNumber])


  useEffect(() => {
    getInfoCo()
  }, [])

  useEffect(() => {
    getAllProductBasket()
  }, [])




  let router = useRoutes(routes)

  return (
    <>
      <SearchProvider>
        <AuthContext.Provider
          value={{
            isLoggedIn,
            token,
            userInfos,
            login,
            logout,
            refresh,
            data,
            numberBoughtProduct,
            productNumber,
            getAllProductBasket,
            allProduct
          }}>
          <>
            <Header informationCo={informationCo} />
            {router}
            <Footer informationCo={informationCo} />
          </>
        </AuthContext.Provider >
      </SearchProvider>
    </>
  )
}

export default App
