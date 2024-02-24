import React from 'react';
import './Slider.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from 'swiper/modules';

export default function Slider() {
    return (
        <div style={{ height: "100%" }}>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                navigation={true}
                className="mySwiper"
            >
                <SwiperSlide ><img className='image' src="../../../public/Images/1.jpeg" alt="" /></SwiperSlide>
                <SwiperSlide ><img className='image' src="../../../public/Images/2.jpeg" alt="" /></SwiperSlide>
                <SwiperSlide ><img className='image' src="../../../public/Images/3.jpeg" alt="" /></SwiperSlide>
                <SwiperSlide ><img className='image' src="../../../public/Images/4.png" alt="" /></SwiperSlide>
                <SwiperSlide ><img className='image' src="../../../public/Images/5.png" alt="" /></SwiperSlide>
            </Swiper>
        </div>
    );
}
