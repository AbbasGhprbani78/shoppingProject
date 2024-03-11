import React from 'react'
import './Basket.css'
import Header from '../../Components/Header/Header'
import BasketItem from '../../Components/BasketItem/BasketItem'
import Footer from '../../Components/Footer/Footer'
import TotalAmount from '../../Components/TotalAmount/TotalAmount'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import { useSearchContext } from '../../Context/SearchContext'
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper'
import BoxProduct from '../../Components/BoxProduct/BoxProduct'

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

                {
                    searchResults &&
                        searchResults.length > 0 ?
                        <>
                            <ProductsWrapper
                                isMore={false}
                            >

                                <div className="all-Products scroll-product">
                                    {
                                        searchResults &&
                                        searchResults.map(product => (
                                            <BoxProduct
                                                key={product.code}
                                                availability_count={product.availability_count}
                                                discount_percentage={product.discount_percentage}
                                                price={product.price}
                                                old_price={product.old_price}
                                                image={product.image}
                                                name={product.name}
                                                model={product.model}
                                                is_discount={product.is_discount}
                                            />
                                        ))
                                    }
                                </div>
                            </ProductsWrapper>
                        </> :
                        <>
                            <div className="basket-items-container">
                                <BasketItem />
                                <BasketItem />
                                <BasketItem />
                                <BasketItem />
                                <BasketItem />
                                <BasketItem />
                            </div>
                            <TotalAmount />
                        </>
                }

            </div>
            <Footer />
        </>
    )
}
