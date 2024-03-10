import React from 'react'
import './Basket.css'
import Header from '../../Components/Header/Header'
import BasketItem from '../../Components/BasketItem/BasketItem'
import Footer from '../../Components/Footer/Footer'
import TotalAmount from '../../Components/TotalAmount/TotalAmount'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import { useSearchContext } from '../../Context/SearchContext'

export default function Basket() {
    const { searchResults } = useSearchContext();
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
                            title: "سبد خرید"
                        }
                    ]} />
                <div className="basket-items-container">
                    <BasketItem />
                    <BasketItem />
                    <BasketItem />
                    <BasketItem />
                    <BasketItem />
                    <BasketItem />
                </div>
                <TotalAmount />
            </div>
            <Footer />
        </>
    )
}
