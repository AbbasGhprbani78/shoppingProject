import { useState, useEffect } from 'react'
import * as React from 'react';
import './Product.css'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
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
import 'swiper/css';
import axios from 'axios';
import { IP } from '../../App';
import swal from 'sweetalert';
import { useSearchContext } from '../../Context/SearchContext';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import AuthContext from '../../Context/AuthContext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

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
    const { pathname } = useLocation();
    const { searchResults } = useSearchContext();
    const { updateSearchResults } = useSearchContext();
    const [value, setValue] = useState(0)
    const [score, setScore] = useState(2);
    const [showProductModal, setShowProductModal] = useState(false);
    const [hours, setHours] = useState(72);
    const [minutes, setMinutes] = useState(34);
    const [seconds, setSeconds] = useState(45);
    const [comment, setComment] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const { productName } = useParams();
    const { id } = useParams();
    const [isShowImages, setIsShowImage] = useState(false);
    const [mainId, setMainId] = useState(id)
    const [allComment, setAllComment] = useState([])
    const authContext = useContext(AuthContext)
    const [purchasedProduct, setPurchasedProduct] = useState([])
    const [relatedProducts, setRelatedProduct] = useState()
    const [mainImageSrc, setMainImageSrc] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addTobasket = async () => {
        const access = localStorage.getItem("user")
        if (!access) {
            swal({
                title: "برای خرید محصول ثبت نام کنید",
                icon: "warning",
                button: "باشه"
            })

            return false
        }
        const headers = {
            Authorization: `Bearer ${access}`
        };
        const body = {
            product_id: id,
            count: 1
        }
        try {
            const response = await axios.post(`${IP}/product/add-product/`, body, {
                headers
            })
            if (response.status === 201) {
                setShowProductModal(true)
                authContext.numberBoughtProduct()
                authContext.getAllProductBasket()
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect(() => {
        updateSearchResults(null)
    }, [])

    useEffect(() => {
        updateSearchResults(null)
    }, [productName])


    const getcomment = async () => {
        try {
            const response = await axios.get(`${IP}/product/get-comment/${id}`)
            if (response.status === 200) {
                setAllComment(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const sendComment = async () => {
        const access = localStorage.getItem('user')
        const headers = {
            Authorization: `Bearer ${access}`
        };
        const comments = {
            comment,
            product_seller_id: mainId,
            user_id: productInfo.product[0].user_id
        }

        try {
            const response = await axios.post(`${IP}/product/send-comment/`, comments, {
                headers
            })
            if (response.status === 201) {
                console.log(response.data)
                swal({
                    title: "پیام شما با موفقیت ثبت شد",
                    icon: "success",
                    button: "باشه"
                })
                setComment("")
                getcomment(id)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getProductBoughtNext = async (id) => {
        try {
            const response = await axios.get(`${IP}/product/product-purchased/${id}`)
            if (response.status === 200) {
                setPurchasedProduct(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getRelatedProducts = async (id) => {
        try {
            const response = await axios.get(`${IP}/product/product-is-same-category/${id}`)
            if (response.status === 200) {
                // console.log(response.data)
                setRelatedProduct(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getotherProduct = async (id) => {
        const body = {
            id: id
        }
        try {
            const response = await axios.post(`${IP}/product/product-detail/`, body)
            if (response.status === 200) {

                setProductInfo(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    const chnageMainTextContent = (id) => {
        getotherProduct(id)
        setMainId(id)
    }

    const getProductInfo = async (id) => {
        const body = {
            id: id
        }
        try {
            const response = await axios.post(`${IP}/product/product-detail/`, body)
            if (response.status === 200) {
                console.log(response.data)
                getcomment(id)
                setProductInfo(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const likeHandler = async (id) => {
        if (authContext.token) {
            console.log("hello")
            const access = localStorage.getItem('user')
            const headers = {
                Authorization: `Bearer ${access}`
            };
            const body = {
                liked: true
            }
            try {
                const response = await axios.post(`${IP}/product/like/${id}`, body, {
                    headers
                })
                if (response.status === 201) {
                    getcomment(id)
                }
            } catch (error) {
                console.log(error.message)

            }
        } else {
            swal({
                title: "برای ثبت  like یا dislike باید ثبت نام کنید",
                icon: "warning",
                button: "باشه"
            })
        }

    }

    const disLikeHandler = async (id) => {

        if (authContext.token) {
            const access = localStorage.getItem('user')
            const headers = {
                Authorization: `Bearer ${access}`
            };
            const body = {
                liked: false
            }
            try {
                const response = await axios.post(`${IP}/product/like/${id}`, body, {
                    headers
                })

                if (response.status === 201) {
                    getcomment(id)
                }
            } catch (error) {
                console.log(error.message)
            }

        } else {
            swal({
                title: "برای ثبت  like یا dislike باید ثبت نام کنید",
                icon: "warning",
                button: "باشه"
            })
        }
    }

    const handleImageHover = (newSrc) => {
        setMainImageSrc(newSrc);
    };


    useEffect(() => {
        getProductInfo(id)
        getRelatedProducts(id)
        getProductBoughtNext(id)
        getotherProduct(id)
    }, [id])

    useEffect(() => {
        getProductInfo()
        getProductBoughtNext()
        getRelatedProducts()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);



    return (
        <>
            {
                productInfo &&
                <div className={`product-more-img ${isShowImages ? "product-more-img-active" : ""}`}>
                    <div className="product-more-img-top d-flex align-items-center justify-content-between">
                        <p className='title-more-image'>تصاویر رسمی</p>
                        <CloseIcon onClick={() => setIsShowImage(false)} />
                    </div>
                    <div className="roduct-more-img-content d-flex">
                        <div className="roduct-more-img-slider">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                loop={true}
                                navigation={true}
                                modules={[Navigation]}
                                className="mySwiper"
                                centeredSlides={true}
                            >
                                {productInfo &&
                                    productInfo.product[0] && productInfo.product[0].images.length > 0 && productInfo.product[0].images.map(image => (
                                        <SwiperSlide className='slider-item'>
                                            <img className="image-more-product" src={`${IP}${image}`} alt="" />
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>
                        </div>
                        <div className="roduct-more-img-info">
                            <p className='product-more-img-content-text'>{productInfo.product[0].description}</p>
                        </div>
                    </div>
                </div>
            }

            <ModalBuy
                showProductModal={showProductModal}
                setShowProductModal={setShowProductModal}
                productInfo={productInfo}
            />
            <div className="home-container">
                <Breadcrumb
                    links={[
                        { id: 1, title: "خانه", to: "" },
                        {
                            title: `${productName}`
                        }
                    ]}
                />
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
                                            <Col xs={6} md={3} style={{ padding: "5px" }}>
                                                <BoxProduct
                                                    id={product && product.sellers[0] && product.sellers[0].id}
                                                    key={product.code}
                                                    availability_count={product.availability_count}
                                                    discount_percentage={product && product.sellers[0] && product.sellers[0].discount_percentage}
                                                    price={product && product.sellers[0] && product.sellers[0].price}
                                                    old_price={product && product.sellers[0] && product.sellers[0].old_price}
                                                    image={product.image}
                                                    name={product.name}
                                                    model={product.model}
                                                    is_discount={product && product.sellers[0] && product.sellers[0].is_discount}
                                                    existence={product && product.sellers[0] && product.sellers[0].availability_status}
                                                />
                                            </Col>

                                        ))
                                    }
                                </div>
                            </ProductsWrapper>
                        </> :
                        <>
                            <div className="main-Product mt-3">
                                <div className="product-info">
                                    <Row>
                                        {
                                            productInfo ?
                                                <>
                                                    <Col xs={12} className='images-wrapper' lg={4}>
                                                        <div className="main-img-product-wrapper" onClick={() => setIsShowImage(true)}>
                                                            {
                                                                productInfo.product[0].is_discount === true &&
                                                                <ProductOff off={productInfo.product[0].discount_percentage} />
                                                            }
                                                            <img className='main-img-product' alt="image product"
                                                                src={`${mainImageSrc ? mainImageSrc : IP + productInfo.product[0].images[0]}`}
                                                            />
                                                        </div>
                                                        {
                                                            productInfo.product[0] && productInfo.product[0].images.length > 3 &&
                                                            <div className="some-img">
                                                                <div className="main-product-img-item">
                                                                    <img className='sub-img-product'
                                                                        src={`${IP}${productInfo.product[0].images[1]}`}
                                                                        alt=""
                                                                        onMouseEnter={(e) => handleImageHover(e.target.src)}
                                                                        onMouseLeave={() => setMainImageSrc("")}
                                                                    />
                                                                </div>
                                                                <div className="main-product-img-item">
                                                                    <img className='sub-img-product'
                                                                        src={`${IP}${productInfo.product[0].images[2]}`}
                                                                        alt=""
                                                                        onMouseEnter={(e) => handleImageHover(e.target.src)}
                                                                        onMouseLeave={() => setMainImageSrc("")}
                                                                    />
                                                                </div>
                                                                <div className="main-product-img-item">
                                                                    <img className='sub-img-product'
                                                                        src={`${IP}${productInfo.product[0].images[3]}`}
                                                                        alt=""
                                                                        onMouseEnter={(e) => handleImageHover(e.target.src)}
                                                                        onMouseLeave={() => setMainImageSrc("")}
                                                                    />
                                                                </div>
                                                            </div>
                                                        }

                                                    </Col>
                                                    <Col xs={12} className='main-product-info' lg={8}>
                                                        <div className="main-product-name-score d-flex justify-content-between align-items-center">
                                                            <p className='main-product-title'>{productInfo.product[0].name}  مدل {productInfo.product[0].model}</p>
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
                                                                    <p className='main-product-attributes-title  title-attribute'>ویژگی ها</p>
                                                                    <p className='main-product-model text-main-product'><span className='main-product-model-span'> مدل : </span>{productInfo.product[0].model}</p>
                                                                    {Object.keys(productInfo.product[0].properties).map((fieldName, index) => (
                                                                        <div key={index}>
                                                                            <p className='main-product-model text-main-product'>
                                                                                <span className='main-product-model-span'>{fieldName} :</span> {Array.isArray(productInfo.product[0].properties[fieldName]) ? (
                                                                                    <>
                                                                                        {productInfo.product[0].properties[fieldName].map((value, index) => (
                                                                                            <span key={index}>{value},</span>
                                                                                        ))}
                                                                                    </>
                                                                                ) : (
                                                                                    <span>{productInfo.product[0].properties[fieldName]}</span>
                                                                                )}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="main-product-price-wrapper">

                                                                    <p className='main-product-price-title'>
                                                                        <span className='gh-price' style={{ fontWeight: "bold" }}> قیمت  :</span>
                                                                        <div className='d-flex'>
                                                                            {
                                                                                productInfo.product[0].is_discount === true &&
                                                                                <strike className='main-product-price-old'>{productInfo.product[0].old_price.toLocaleString("fa")}</strike>
                                                                            }
                                                                            <p className='main-product-price-new'> {Math.round(productInfo.product[0].price).toLocaleString("fa")}<span className='main-product-price-new-currency'>تومان</span></p>
                                                                        </div>
                                                                    </p>
                                                                    <div className='options-buy'>
                                                                        <button
                                                                            className={`add-baskect-btn ${!productInfo.product[0].availability_status ? "btn-disable" : ""}`}
                                                                            onClick={addTobasket}
                                                                            disabled={!productInfo.product[0].availability_status ? true : false}
                                                                        >
                                                                            <p className='add-basket-p'>افزودن به سبد</p>
                                                                            <p className='add-baskect-btn-icon'>
                                                                                <ShoppingBasketOutlinedIcon className='card-header' />
                                                                            </p>
                                                                        </button>
                                                                    </div>
                                                                    {
                                                                        !productInfo.product[0].availability_status &&
                                                                        <p className='existence'>موجود نیست !</p>
                                                                    }

                                                                </div>
                                                            </Col>
                                                            <Col md={5} className="services-wrapper">
                                                                <div className='dropdown-product my-5 '>
                                                                    <span className='sellers-text mb-2'>فروشندگان</span>
                                                                    <select
                                                                        className='changeProduct-seller'
                                                                        onChange={(e) => chnageMainTextContent(e.target.value)}
                                                                    >
                                                                        {productInfo && productInfo.other_sellers.length > 0 && productInfo.other_sellers.map(seller => (
                                                                            <option value={seller.id} selected={seller.id === productInfo.product[0].id}>
                                                                                {seller.brand_name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
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
                                                </> :
                                                <>
                                                    <div className='d-flex justify-content-center'>
                                                        <div class="spinner"></div>
                                                    </div>
                                                </>
                                        }
                                    </Row>
                                </div>
                                {
                                    productInfo &&
                                    <>
                                        <div className="product-about">
                                            <Box sx={{ width: '100%' }}>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs
                                                        value={value}
                                                        onChange={handleChange}
                                                        aria-label="basic tabs example"
                                                        variant="scrollable"
                                                    >
                                                        <Tab label={<><SellOutlinedIcon fontSize="small" /><span className='tab-title'>مشخصات محصول </span></>} {...a11yProps(0)} />
                                                        <Tab label={<><ChatBubbleOutlineIcon fontSize="small" /><span className='tab-title'>دیدگاه مشتریان </span></>} {...a11yProps(1)} />
                                                    </Tabs>
                                                </Box>
                                                <CustomTabPanel value={value} index={0}>
                                                    <Row className='product-specifications-top'>
                                                        <Col className='product-specifications-text-wrapper' md={7}>
                                                            <p className='product-specifications-text'>
                                                                {productInfo.product[0].description}
                                                            </p>
                                                        </Col>
                                                        <Col className='product-specifications-img-wrapper-col' md={5}>
                                                            {
                                                                productInfo && productInfo.product[0] && productInfo.product[0].images.length > 0 &&
                                                                <div className='product-specifications-img-wrapper'>
                                                                    <img className='product-specifications-img' src={`${IP}${productInfo.product[0].images[0]}`} alt="" />
                                                                </div>
                                                            }

                                                        </Col>
                                                    </Row>
                                                    <Row>

                                                    </Row>
                                                </CustomTabPanel>
                                                <CustomTabPanel value={value} index={1}>
                                                    <div className='comments-wrapper'>
                                                        {
                                                            allComment && allComment.length > 0 ?
                                                                <>
                                                                    {
                                                                        allComment.map(comment => (
                                                                            <Comments
                                                                                key={comment.id}
                                                                                date={comment.date_time}
                                                                                text={comment.comment}
                                                                                id={comment.id}
                                                                                dislike={comment.num_dislikes}
                                                                                like={comment.num_likes}
                                                                                likeHandler={likeHandler}
                                                                                disLikeHandler={disLikeHandler}
                                                                            />
                                                                        ))
                                                                    }
                                                                </> :
                                                                <>
                                                                    <p className='alert-comment'>
                                                                        هیچ کامنتی وجود ندارد
                                                                    </p>
                                                                </>
                                                        }
                                                    </div>
                                                    {
                                                        authContext.token &&
                                                        <div className="send-comment-wrapper">
                                                            <div className="send-comment-wrapper-title">
                                                                <EmailOutlinedIcon style={{ marginLeft: "12px" }} />
                                                                ثبت دیدگاه شما
                                                            </div>
                                                            <div className='comment-place-wrapper'>
                                                                <textarea
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                    value={comment}
                                                                    className='comment-place'

                                                                ></textarea>
                                                            </div>
                                                            <div className="send-score">
                                                                <Box
                                                                    sx={{
                                                                        '& > legend': { mt: 2 },
                                                                    }}
                                                                >
                                                                    <Rating
                                                                        dir='ltr'
                                                                        name="simple-controlled"
                                                                        value={score}
                                                                        onChange={(event, newValue) => {
                                                                            setScore(newValue);
                                                                        }}
                                                                    />
                                                                </Box>
                                                                <button className='btn-send-comment' onClick={sendComment}>ارسال</button>
                                                            </div>
                                                        </div>
                                                    }

                                                </CustomTabPanel>
                                            </Box>
                                        </div>
                                    </>
                                }

                            </div>
                            {

                                relatedProducts && relatedProducts.length > 0 &&
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
                                            {
                                                relatedProducts && relatedProducts.length > 0 ?
                                                    <>
                                                        {
                                                            relatedProducts.map(product => (
                                                                <SwiperSlide
                                                                    key={product.id}
                                                                >
                                                                    <BoxProduct
                                                                        id={product.id}
                                                                        availability_count={product.availability_count}
                                                                        discount_percentage={product.discount_percentage}
                                                                        price={product.price}
                                                                        old_price={product.old_price}
                                                                        image={product.image}
                                                                        name={product.name}
                                                                        model={product.model}
                                                                        is_discount={product.is_discount}
                                                                        existence={product.availability_status}
                                                                    />
                                                                </SwiperSlide>
                                                            ))
                                                        }
                                                    </> :
                                                    <>
                                                        <div className='d-flex justify-content-center'>
                                                            <div class="spinner"></div>
                                                        </div>
                                                    </>
                                            }
                                        </Swiper>
                                    </div>
                                </ProductsWrapper>
                            }
                            {
                                purchasedProduct && purchasedProduct.length > 0 &&
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
                                            {
                                                purchasedProduct && purchasedProduct.length > 0 ?
                                                    <>
                                                        {
                                                            purchasedProduct.map(product => (

                                                                <SwiperSlide
                                                                    key={product.key}
                                                                >
                                                                    <BoxProduct
                                                                        id={product.id}
                                                                        availability_count={product.availability_count}
                                                                        discount_percentage={product.discount_percentage}
                                                                        price={product.price}
                                                                        old_price={product.old_price}
                                                                        image={product.image}
                                                                        name={product.name}
                                                                        model={product.model}
                                                                        is_discount={product.is_discount}
                                                                        existence={product.availability_status}
                                                                    />
                                                                </SwiperSlide>
                                                            ))
                                                        }
                                                    </> :
                                                    <>
                                                        <div className='d-flex justify-content-center'>
                                                            <div class="spinner"></div>
                                                        </div>
                                                    </>
                                            }
                                        </Swiper>
                                    </div>
                                </ProductsWrapper>
                            }

                        </>
                }
            </div >
        </>
    )
}




// useEffect(() => {
//     const offTimer = setInterval(() => {
//         if (seconds === 0) {
//             setSeconds(59);
//             if (minutes === 0) {
//                 setMinutes(59);
//                 if (hours == 0) {
//                     clearInterval(offTimer)
//                     return
//                 } else {
//                     setHours(prevHour => prevHour - 1)
//                 }
//             } else {
//                 setMinutes(prevSecond => prevSecond - 1)
//             }
//         } else {
//             setSeconds(prevSecond => prevSecond - 1)
//         }
//     }, 1000)

//     return () => clearInterval(offTimer)

// }, [hours, minutes, seconds])