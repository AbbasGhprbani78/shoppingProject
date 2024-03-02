import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header/Header'
import Silder from '../../Components/Silder/Silder'
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper'
import ShowAbout from '../../Components/ShowAbout/ShowAbout'
import Footer from '../../Components/Footer/Footer'
import './Home.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BoxProduct from '../../Components/BoxProduct/BoxProduct'
import { IP } from '../../App'
import axios from 'axios'


export default function Home() {

    const [allProductsHome, setAllProductsHome] = useState([])
    const [topSeling, setTopSeling] = useState([])

    const getProductsHome = async () => {
        try {
            const response = await axios.get(`${IP}/product/home/`)
            if (response.status === 200) {
                setAllProductsHome(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const getTopSeling = async () => {
        try {
            const response = await axios.get(`${IP}/top-selling-products`)
            if (response.status === 200) {
                // setAllProductsHome(response.data)
                console.log(response)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getProductsHome()
        getTopSeling()
    }, [])
    return (
        <>
            <Header />
            <div className="home-container">
                <Silder />
                <ProductsWrapper
                    title="تخفیف خورده ها"
                    link={"#"}
                >
                    <div className="products-container">
                        <Swiper
                            style={{ width: "100%" }}
                            slidesPerView={4}
                            spaceBetween={30}
                            loop={true}
                            className="mySwiper-products"
                            centeredSlides={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 2
                                },
                                768: {
                                    slidesPerView: 3
                                },
                                992: {
                                    slidesPerView: 3
                                },
                                1000: {
                                    slidesPerView: 4
                                },
                            }
                            }
                        >

                            {
                                allProductsHome ? (
                                    allProductsHome.products_with_discount &&
                                    allProductsHome.products_with_discount.map((product, i) => (
                                        <SwiperSlide > <BoxProduct /></SwiperSlide>
                                    ))

                                ) : (null)
                            }
                        </Swiper>
                    </div>
                </ProductsWrapper>
                <ProductsWrapper
                    title="جدید ترین ها"
                    link={"#"}
                >
                    <div className="products-container">
                        <Swiper
                            style={{ width: "100%" }}
                            slidesPerView={4}
                            spaceBetween={30}
                            loop={true}
                            className="mySwiper-products"
                            centeredSlides={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 2
                                },
                                768: {
                                    slidesPerView: 3
                                },
                                992: {
                                    slidesPerView: 3
                                },
                                1000: {
                                    slidesPerView: 4
                                },
                            }
                            }
                        >
                            {
                                allProductsHome ? (
                                    allProductsHome.products_without_discount &&
                                    allProductsHome.products_without_discount.map((product) => (
                                        <SwiperSlide key={product.product_or_service_code}>
                                            <BoxProduct
                                                image={product.image}
                                                model={product.model}
                                                name={product.name}
                                                id={product.product_or_service_code}
                                                price={product.price}
                                            />
                                        </SwiperSlide>
                                    ))

                                ) : (null)
                            }
                        </Swiper>
                    </div>
                </ProductsWrapper>
                <ProductsWrapper
                    title="پرفروش ها"
                    link={"#"}
                >
                    <div className="products-container">
                        <Swiper
                            style={{ width: "100%" }}
                            slidesPerView={4}
                            spaceBetween={30}
                            loop={true}
                            className="mySwiper-products"
                            centeredSlides={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 2
                                },
                                768: {
                                    slidesPerView: 3
                                },
                                992: {
                                    slidesPerView: 3
                                },
                                1000: {
                                    slidesPerView: 4
                                },
                            }
                            }
                        >
                            {
                                allProductsHome ? (
                                    allProductsHome.products_without_discount &&
                                    allProductsHome.products_without_discount.map((product) => (
                                        <SwiperSlide key={product.product_or_service_code}>
                                            <BoxProduct
                                                image={product.image}
                                                model={product.model}
                                                name={product.name}
                                                id={product.product_or_service_code}
                                                price={product.price}
                                            />
                                        </SwiperSlide>
                                    ))

                                ) : (null)
                            }
                        </Swiper>
                    </div>
                </ProductsWrapper>
                <ShowAbout />
            </div>
            <Footer />
        </>

    )
}
