import React from 'react'
import './PurcheasHistory.css'
import DoneIcon from '@mui/icons-material/Done';
import { Col } from 'react-bootstrap';
export default function PurcheasHistoryItem() {
    return (
        <div className='PurcheasHistoryItem my-4'>
            <Col md={6} className="purcheasHistoryItem-right">
                <div className="delivery-wrapper">
                    <span className='doneicon-wrapp'><DoneIcon /></span>
                    <p className='delivery-text'>تحویل داده شده</p>
                </div>
                <div className='all-buy-product-image'>
                    <div className="product-buy">
                        <img src="../../../public/Images/Xiaomi-POCO-M4-Pro-5G.jpg" alt="" />
                    </div>
                    <div className="product-buy">
                        <img src="../../../public/Images/galaxy-s24-highlights-color-sandstone-orange-back-mo.jpg" alt="" />
                    </div>
                    <div className="product-buy">
                        <img src="../../../public/Images/A52_5G_AwesomeBlack_ProductKV_MO_img.jpg" alt="" />
                    </div>
                    <div className="product-buy">
                        <img src="../../../public/Images/Honor-70-5G-mobile-phone-with-128gb-256gb-512gb-capacity-6gb-8gb-12gb-ram-Silver.png.webp" alt="" />
                    </div>
                    <div className="product-buy">
                        <img src="../../../public/Images/Laptop-CHUWI-GemiBook-Xpro-14-1-N100-8GB-256GB.jpeg" alt="" />
                    </div>
                </div>
            </Col>
            <Col md={6} className="purcheasHistoryItem-left">
                <Col md={7} className="product-buy-detail-wrapper">
                    <div className="product-buy-detail">
                        <p className="product-buy-title">قیمت کل</p>
                        <p className="product-buy-info">6.000.000<span className='currence-buy'>تومان</span></p>
                    </div>
                    <div className="product-buy-detail">
                        <p className="product-buy-title">تعداد</p>
                        <p className="product-buy-info">4 عدد</p>
                    </div>
                    <div className="product-buy-detail">
                        <p className="product-buy-title">کد رهگیری</p>
                        <p className="product-buy-info">102555496</p>
                    </div>
                    <div className="product-buy-detail">
                        <p className="product-buy-title">تاریخ سفارش</p>
                        <p className="product-buy-info">01/02/23</p>
                    </div>
                </Col>
                <Col md={5} style={{ direction: "ltr" }}>
                    <button className='btn-detail-products'>جزئیات</button>
                </Col>
            </Col>

        </div>
    )
}
