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
                <Link to={`/product-info/tail/1`} style={{ all: "unset", cursor: "pointer" }}>
                    <div className="product-img-wrapper">
                        <ProductOff />
                        <img className='product-img' src={`../../../public/Images/1.jpeg`} alt="" />
                    </div>
                    <div className="product-body">
                        <div className='product-name'>ماشین مسابفه</div>
                        <p className='product-model'>مدل 4578</p>
                        <strike className='old-product-price'>{Number(1000000).toLocaleString("fa")}</strike>
                        <p className='new-product-price'>{Number(17000000).toLocaleString("fa")}<span className='currency'>تومان</span></p>
                    </div>
                </Link>
            </div>
        </>
    )
}
