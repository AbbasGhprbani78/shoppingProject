import React from 'react'
import './ProductsWrapper.css'
import Button1 from '../Button1/Button1'
import BoxProduct from '../BoxProduct/BoxProduct'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function ProductsWrapper() {
    return (
        <div className='Products-Wrapper'>
            <div className='Products-Wrapper-top d-flex align-items-center justify-content-between'>
                <p className='Products-Wrapper-title'>تخفیف خورده ها</p>
                <Button1 />
            </div>
            <div className="product-container d-flex">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    className="mySwiper"
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
        </div>
    )
}
