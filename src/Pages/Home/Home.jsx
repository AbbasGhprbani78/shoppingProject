import React from 'react'
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


export default function Home() {
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
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                        </Swiper>
                    </div>
                </ProductsWrapper>
                <ProductsWrapper
                    title="جدید ترین ها"
                    link={"#"}
                >
                    <div className="products-container">
                        <Swiper
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
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                        </Swiper>
                    </div>
                </ProductsWrapper>
                <ShowAbout />
            </div>
            <Footer />
        </>

    )
}
