import React from 'react'
import './ProductsWrapper.css'
import Button1 from '../Button1/Button1'
import BoxProduct from '../BoxProduct/BoxProduct'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';



export default function ProductsWrapper({ title, link }) {
    return (
        <div className='Products-Wrapper'>
            <div className='Products-Wrapper-top d-flex  justify-content-between'>
                <p className='Products-Wrapper-title'>{title}</p>
                <div style={{ marginLeft: "2%" }}>
                    <Button1
                        link={link}
                    />
                </div>
            </div>

            <div className="products-container">
                <Swiper
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={4}
                    spaceBetween={30}
                    loop={true}
                    modules={[Autoplay]}
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
        </div >
    )
}
