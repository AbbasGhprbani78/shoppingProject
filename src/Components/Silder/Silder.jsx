import React from 'react';
import './Slider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


export default function Slider() {
    return (
        <div className='slider-container'>
            <Swiper
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
                centeredSlides={true}
            >
                <SwiperSlide className='slider-item'><img className="image" src="../../../public/Images/1.jpeg" alt="" /></SwiperSlide>
                <SwiperSlide className='slider-item'><img className="image" src="../../../public/Images/2.jpg" alt="" /></SwiperSlide>
                <SwiperSlide className='slider-item'><img className="image" src="../../../public/Images/6.jpg" alt="" /></SwiperSlide>
                <SwiperSlide className='slider-item'><img className="image" src="../../../public/Images/4.jpg" alt="" /></SwiperSlide>
                <SwiperSlide className='slider-item'><img className="image" src="../../../public/Images/5.jpg" alt="" /></SwiperSlide>
            </Swiper>
        </div>
    );
}
