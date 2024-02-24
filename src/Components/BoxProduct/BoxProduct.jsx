import React from 'react'
import './BoxProduct.css'
import ProductOff from '../ProductOff/ProductOff'
import { Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
export default function BoxProduct() {
    return (
        <>
            <Card style={{ width: '22rem', border: "none" }}>
                <Card.Img style={{ height: "130px" }} variant="top" src="../../../public/Images/6.jfif" />
                <Card.Body className='card-product'>
                    <p className="product-name">شیرالات یک</p>
                    <p>مدل 0285</p>
                    <p className='product-price-old text-muted'>10.000.000</p>
                    <p><span className='price'>6.000.000</span>تومان</p>
                </Card.Body>
                <ProductOff />
            </Card>
        </>
    )
}
