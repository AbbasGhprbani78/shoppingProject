import React from 'react'
import './BoxProduct.css'
import ProductOff from '../ProductOff/ProductOff'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IP } from '../../App'
export default function BoxProduct({
    image,
    model,
    name,
    id,
    price
}) {
    return (
        <>
            <div className="product-box">
                <Link to={`/product-info/${name}/${id}`} style={{ all: "unset", cursor: "pointer" }}>
                    <div className="product-img-wrapper">
                        <ProductOff />
                        <img className='product-img' src={`${IP}${image}`} alt="" />
                    </div>
                    <div className="product-body">
                        <div className='product-name'>{name}</div>
                        <p className='product-model'>مدل {model}</p>
                        <strike className='old-product-price'>10.000.000</strike>
                        <p className='new-product-price'>{price && price.toLocaleString()}<span className='currency'>تومان</span></p>
                    </div>
                </Link>
            </div>
        </>
    )
}
