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
import AuthContext from '../../Context/AuthContext'
import { useContext } from 'react'
import { useSearchContext } from '../../Context/SearchContext'

export default function Home() {

    const [topSeling, setTopSeling] = useState([])
    const authContext = useContext(AuthContext);
    const { searchResults } = useSearchContext();

    const getTopSeling = async () => {
        try {
            const response = await axios.get(`${IP}/product/top-selling-products/`)
            if (response.status === 200) {
                setTopSeling(response.data.products)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getTopSeling()
    }, [])



    return (
        <>
            <Header
            />
            <div className="home-container">
                {
                    searchResults &&
                        searchResults.length > 0 ?
                        <>
                            <ProductsWrapper
                                isMore={false}
                            >

                                <div className="all-Products scroll-product">
                                    {
                                        searchResults &&
                                        searchResults.map(product => (
                                            <BoxProduct
                                                key={product.code}
                                                availability_count={product.availability_count}
                                                discount_percentage={product.discount_percentage}
                                                price={product.price}
                                                old_price={product.old_price}
                                                image={product.image}
                                                name={product.name}
                                                model={product.model}
                                                is_discount={product.is_discount}
                                            />
                                        ))
                                    }
                                </div>
                            </ProductsWrapper>
                        </> :
                        <>
                            <Silder />
                            {
                                authContext.data && authContext.data.products_with_discount.length > 0 &&
                                <ProductsWrapper
                                    title="تخفیف خورده ها"
                                    link={"/products/offs/1"}
                                    isMore={true}
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
                                                authContext ? (
                                                    authContext.data &&
                                                    authContext.data.products_with_discount.map((product, i) => (
                                                        <SwiperSlide >
                                                            <BoxProduct
                                                                availability_count={product.availability_count}
                                                                discount_percentage={product.discount_percentage}
                                                                price={product.price}
                                                                old_price={product.old_price}
                                                                image={product.image}
                                                                name={product.name}
                                                                model={product.model}
                                                                is_discount={product.is_discount}
                                                            />
                                                        </SwiperSlide>
                                                    ))

                                                ) : (null)
                                            }
                                        </Swiper>
                                    </div>
                                </ProductsWrapper>

                            }

                            {
                                authContext.data && authContext.data.products_without_discount.length > 0 &&
                                <ProductsWrapper
                                    title="جدید ترین ها"
                                    link={"/products/newest/1"}
                                    isMore={true}
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
                                                authContext ? (
                                                    authContext.data &&
                                                    authContext.data.products_without_discount.map((product) => (
                                                        <SwiperSlide key={product.product_or_service_code}>
                                                            <BoxProduct
                                                                availability_count={product.availability_count}
                                                                discount_percentage={product.discount_percentage}
                                                                price={product.price}
                                                                old_price={product.old_price}
                                                                image={product.image}
                                                                name={product.name}
                                                                model={product.model}
                                                                is_discount={product.is_discount}
                                                            />
                                                        </SwiperSlide>
                                                    ))

                                                ) : (null)
                                            }
                                        </Swiper>
                                    </div>
                                </ProductsWrapper>
                            }

                            {
                                topSeling && topSeling.length > 0
                                &&
                                <ProductsWrapper
                                    title="پرفروش ها"
                                    link={"/products//1"}
                                    isMore={true}
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
                                                topSeling ? (
                                                    topSeling &&
                                                    topSeling.map((product) => (
                                                        <SwiperSlide key={product.product_or_service_code}>
                                                            <BoxProduct
                                                                availability_count={product.availability_count}
                                                                discount_percentage={product.discount_percentage}
                                                                price={product.price}
                                                                old_price={product.price_with_discount}
                                                                image={product.product_or_service.image}
                                                                name={product.product_or_service.name}
                                                                model={product.product_or_service.model}
                                                                is_discount={product.is_discount}
                                                            />
                                                        </SwiperSlide>
                                                    ))

                                                ) : (null)
                                            }
                                        </Swiper>
                                    </div>
                                </ProductsWrapper>
                            }
                            <ShowAbout />
                        </>
                }

            </div >
            <Footer />
        </>

    )
}
