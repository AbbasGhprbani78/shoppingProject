import React, { useState, useEffect } from 'react';
import './Slider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';
import { IP } from '../../App';
import { Link } from 'react-router-dom';
export default function Slider() {

    const [sliderInfo, setSliderInfo] = useState([])

    const getPicsSlider = async () => {

        try {
            const response = await axios.get(`${IP}/product/get-slider/`)
            if (response.status === 200) {

                setSliderInfo(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getPicsSlider()
    }, [])

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
                {
                    sliderInfo &&
                    sliderInfo.map(slide => (
                        <SwiperSlide
                            className='slider-item'
                            key={slide.brand}
                        >
                            <Link to={`/brand/${slide.brand}`} style={{ all: "unset" }}>
                                <img className="image" src={`${IP}${slide.image}`} alt="" />
                            </Link>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    );
}
