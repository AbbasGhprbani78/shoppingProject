import React, { useContext } from 'react'
import './TotalAmount.css'
import axios from 'axios'
import { IP } from '../../App'
import swal from 'sweetalert'
import AuthContext from '../../Context/AuthContext'
export default function TotalAmount() {

    const authContext = useContext(AuthContext)

    const completeBasket = async () => {
        const access = localStorage.getItem("user")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/product/order-ispaid/${authContext?.allProduct?.cart_id}`, {
                headers
            })
            if (response.status === 200) {
                swal({
                    title: "خرید با موفقیت انجام شد",
                    icon: "success",
                    button: "باشه"
                })
                authContext.getAllProductBasket()
                authContext.numberBoughtProduct()
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            <div className='totalamount-wrapper'>
                <div className="total-price-wrapper">
                    مبلغ کل
                    <span>{authContext?.allProduct?.total_price.toLocaleString("fa")} تومان</span>
                </div>
                <div className="complete-basket-btn-wrapper" >
                    <button className="complete-basket-btn" onClick={completeBasket}>
                        تکمیل سبد خرید
                    </button>
                </div>
            </div>
        </>
    )
}
