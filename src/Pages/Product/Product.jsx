import React from 'react'
import './Product.css'
import Header from '../../Components/Header/Header'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import Footer from '../../Components/Footer/Footer'
import { Row, Col } from 'react-bootstrap';
import ProductOff from '../../Components/ProductOff/ProductOff'

export default function Product() {
    return (
        <>
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
                            <Col className='images-wrapper' md={4}>
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
                            <Col className='main-product-info' md={8}>
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
                                <div className="main-product-attributes-wrapper">
                                    <div md={6} className="main-product-attributes">
                                        <h5 className='main-product-attributes-title mb-3'>ویژگی ها</h5>
                                        <p className='main-product-model text-main-product'><span className='main-product-model-span'> مدل : </span>مرمر سیاه</p>
                                        <p className='main-product-material text-main-product'><span className='main-product-model-span'>جنس :</span>02514sm</p>
                                        <p className='main-product-cdoes text-main-product'><span className='main-product-model-span'>سریال :</span> سنگ</p>
                                        <p className='main-product-color text-main-product'> <span className='main-product-model-span'>رنگ ها :</span>مشکی ، کرمی ، صورتی ، طوسی</p>
                                    </div>
                                    <div md={6} className=""></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="product-about"></div>
                </div>
            </div>
            <Footer />
        </>
    )
}
