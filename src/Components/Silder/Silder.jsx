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
    const [sliderInfo, setSliderInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPicsSlider = async () => {
        try {
            const response = await axios.get(`${IP}/product/get-slider/`);
            if (response.status === 200) {
                setSliderInfo(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getPicsSlider();
    }, []);

    if (loading) {
        return (
            <div className="loadingSilder">
                <div className='d-flex justify-content-center w-100'>
                    <div class="spinner"></div>
                </div>
            </div>
        )
    }

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
                {sliderInfo.map((slide) => (
                    <SwiperSlide className='slider-item' key={slide.brand.id}>
                        <Link to={`/brand/${slide.brand.brand_name}/${slide.brand.id}`} style={{ all: 'unset' }}>
                            <img className="image" src={`${IP}${slide.image}`} alt="" />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
