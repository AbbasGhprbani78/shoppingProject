import React from 'react'
import './BoxProduct.css'
import ProductOff from '../ProductOff/ProductOff'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IP } from '../../App'
export default function BoxProduct({
    availability_count,
    discount_percentage,
    price,
    old_price,
    image,
    name,
    model,
    is_discount
}) {
    return (
        <>
            <div className="product-box">
                <Link to={`/product-info/tail/1`} style={{ all: "unset", cursor: "pointer" }}>
                    <div className="product-img-wrapper">{
                        discount_percentage ?
                            <>
                                <ProductOff
                                    off={discount_percentage}
                                />
                            </> : null

                    }

                        <img className='product-img' src={`${IP}${image}`} alt="" />
                    </div>
                    <div className="product-body">
                        <div className='product-name'>{name}</div>
                        <p className='product-model'>{model}</p>
                        {
                            is_discount &&
                            <strike className='old-product-price'>{Number(old_price).toLocaleString("fa")}</strike>
                        }
                        <p className={`new-product-price ${old_price ? "" : "price-m"}`}>{Number(price).toLocaleString("fa")}<span className='currency'>تومان</span></p>
                    </div>
                </Link>
            </div>
        </>
    )
}
