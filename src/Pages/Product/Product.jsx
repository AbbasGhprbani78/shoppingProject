import { useState, useEffect } from 'react'
import * as React from 'react';
import './Product.css'
import Header from '../../Components/Header/Header'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import Footer from '../../Components/Footer/Footer'
import { Row, Col } from 'react-bootstrap';
import ProductOff from '../../Components/ProductOff/ProductOff'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Comments from '../../Components/Comments/Comments';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Rating from '@mui/material/Rating';
import ModalBuy from '../../Components/ModalBuy/ModalBuy';
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper';
import BoxProduct from '../../Components/BoxProduct/BoxProduct';
import { Swiper, SwiperSlide } from 'swiper/react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import 'swiper/css';
function CustomTabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Product() {
    const [value, setValue] = useState(0)
    const [score, setScore] = useState(2);
    const [showProductModal, setShowProductModal] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addTobasket = () => {
        setShowProductModal(true)
    }
    return (
        <>
            <ModalBuy
                showProductModal={showProductModal} setShowProductModal={setShowProductModal} />
            <Header />
            <div className="home-container">
                <Breadcrumb
                    links={[
                        { id: 1, title: "خانه", to: "" },
                        {
                            id: 2,
                            title: "فروشگاه",
                            to: "",
                        },
                        {
                            title: "کاشی"
                        }
                    ]}
                />
                <div className="main-Product">
                    <div className="product-info">
                        <Row>
                            <Col xs={12} className='images-wrapper' lg={4}>
                                <div className="main-img-product-wrapper">
                                    <ProductOff />
                                    <img className='main-img-product' src="../../../public/Images/18.jpg" alt="image product" />
                                </div>
                                <div className="some-img">
                                    <div className="main-product-img-item">
                                        <img src="../../../public/Images/15.png" alt="" />
                                    </div>
                                    <div className="main-product-img-item">
                                        <img src="../../../public/Images/17.jpg" alt="" />
                                    </div>
                                    <div className="main-product-img-item">
                                        <img src="../../../public/Images/16.jpg" alt="" />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} className='main-product-info' lg={8}>
                                <div className="main-product-name-score d-flex justify-content-between align-items-center">
                                    <p className='main-product-title'>کاشی مرجان مدل 0251 </p>
                                    <div className="main-product-score">
                                        <img src="../../../public/Images/star_fill.svg" alt="" />
                                        <img src="../../../public/Images/star_fill.svg" alt="" />
                                        <img src="../../../public/Images/star_fill.svg" alt="" />
                                        <img src="../../../public/Images/star_fill.svg" alt="" />
                                        <img src="../../../public/Images/star_fill.svg" alt="" />
                                    </div>
                                </div>
                                <Row className="main-product-attributes-wrapper">
                                    <Col md={5} className="main-product-attributes">
                                        <div>
                                            <h5 className='main-product-attributes-title mb-3'>ویژگی ها</h5>
                                            <p className='main-product-model text-main-product'><span className='main-product-model-span'> مدل : </span>مرمر سیاه</p>
                                            <p className='main-product-material text-main-product'><span className='main-product-model-span'>جنس :</span>02514sm</p>
                                            <p className='main-product-cdoes text-main-product'><span className='main-product-model-span'>سریال :</span> سنگ</p>
                                            <p className='main-product-color text-main-product'> <span className='main-product-model-span'>رنگ ها :</span>مشکی ، کرمی ، صورتی ، طوسی</p>
                                        </div>
                                        <div className="main-product-price-wrapper">
                                            <p className='main-product-price-title'>
                                                قیمت :<strike className='main-product-price-old'>2,500,000</strike><p className='main-product-price-new'>750,000<span className='main-product-price-new-currency'>تومان</span></p>
                                            </p>
                                            <div className='options-buy'>
                                                <button className='add-baskect-btn' onClick={addTobasket}>
                                                    افزودن به سبد
                                                    <p className='add-baskect-btn-icon'>
                                                        <svg className='card-header bi bi-basket2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                            <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
                                                            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" />
                                                        </svg>
                                                    </p>
                                                </button>
                                                <div className="basket-options">
                                                    <div className="plus-product">+</div>
                                                    <div className='count-product'>1</div>
                                                    <div className='delete-product-basket'><DeleteOutlineOutlinedIcon /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={5} className="services-wrapper">
                                        <div className='off-detail'>
                                            <div className="off-specials">
                                                تخفیف ویژه
                                            </div>
                                            <div className="timing-off-wrapper d-flex align-items-center">
                                                <div className="time-day time-off">12</div>:
                                                <div className="time-hour time-off">34</div>:
                                                <div className="time minute time-off">45</div>
                                            </div>
                                        </div>
                                        <div className="main-services-wrapper">
                                            <div>
                                                <ul className='product-services-list'>
                                                    <li className='product-service-item'>24 ساعت امکان مرجوع کالا</li>
                                                    <li className='product-service-item'>نصب رایگان</li>
                                                    <li className='product-service-item'>ارسال فوری و رایگان</li>
                                                    <li className='product-service-item'>24 ساعت امکان مرجوع کالا</li>
                                                </ul>
                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className="product-about">
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    variant="scrollable"
                                >
                                    <Tab label={<><SellOutlinedIcon fontSize="small" /> مشخصات محصول</>} {...a11yProps(0)} />
                                    <Tab label={<><ChatBubbleOutlineIcon fontSize="small" /> دیدگاه مشتریان</>} {...a11yProps(1)} />
                                    <Tab label={<><CreditCardIcon fontSize="small" /> پرداخت الکترونیکی</>} {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <Row className='product-specifications-top'>
                                    <Col style={{ height: "100%" }} className='product-specifications-text-wrapper' md={7}>
                                        <p className='product-specifications-text'>
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                        </p>
                                    </Col>
                                    <Col className='product-specifications-img-wrapper-col' md={5}>
                                        <div className='product-specifications-img-wrapper'>
                                            <img className='product-specifications-img' src="../../../public/Images/18.jpg" alt="" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>

                                </Row>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <div className='comments-wrapper'>
                                    <Comments />
                                    <Comments />
                                    <Comments />
                                    <Comments />
                                    <Comments />
                                    <Comments />
                                </div>
                                <div className="send-comment-wrapper">
                                    <div className="send-comment-wrapper-title">
                                        <EmailOutlinedIcon style={{ marginLeft: "12px" }} />
                                        ثبت دیدگاه شما
                                    </div>
                                    <div className='comment-place-wrapper'>
                                        <textarea className='comment-place'></textarea>
                                    </div>
                                    <div className="send-score">
                                        <Box
                                            sx={{
                                                '& > legend': { mt: 2 },
                                            }}
                                        >
                                            <Rating
                                                name="simple-controlled"
                                                value={score}
                                                onChange={(event, newValue) => {
                                                    setScore(newValue);
                                                }}
                                            />
                                        </Box>
                                        <button className='btn-send-comment'>ارسال</button>
                                    </div>
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                Item Three
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
                <ProductsWrapper
                    title="محصولات مرتبط"
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

                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                        </Swiper>
                    </div>
                </ProductsWrapper>
                <ProductsWrapper
                    title="در کنارش خریداری شده"
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

                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                            <SwiperSlide > <BoxProduct /></SwiperSlide>
                        </Swiper>
                    </div>
                </ProductsWrapper>
            </div>
            <Footer />
        </>
    )
}
