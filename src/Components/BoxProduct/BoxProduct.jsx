import React from 'react'
import './BoxProduct.css'
import ProductOff from '../ProductOff/ProductOff'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function BoxProduct() {
    return (
        <>
            <div className="product-box">
                <Link to={"/product-info/tail"} style={{ all: "unset", cursor: "pointer" }}>
                    <div className="product-img-wrapper">
                        <ProductOff />
                        <img className='product-img' src="../../../public/Images/8.jfif" alt="" />
                    </div>
                    <div className="product-body">
                        <p className='product-name'>شیرالات یک</p>
                        <p className='product-model'>مدل 0285</p>
                        <strike className='old-product-price'>10.000.000</strike>
                        <p className='new-product-price'>6.000.000<span className='currency'>تومان</span></p>
                    </div>
                </Link>
            </div>
        </>
    )
}
