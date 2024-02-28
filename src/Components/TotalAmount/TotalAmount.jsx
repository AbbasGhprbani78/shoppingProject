import React from 'react'
import './TotalAmount.css'
export default function TotalAmount() {
    return (
        <>
            <div className='totalamount-wrapper'>
                <div className="total-price-wrapper">
                    مبلغ کل
                    <span>   6.000.000 تومان</span>
                </div>
                <div className="amount-payable-wrapper">
                    مبلغ قابل پرداخت
                    <span>   6.000.000 تومان</span>
                </div>
                <div className="complete-basket-btn-wrapper" >
                    <button className="complete-basket-btn">
                        تکمیل سبد خرید
                    </button>
                </div>
            </div>
        </>
    )
}
