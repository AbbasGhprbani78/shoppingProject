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
import axios from 'axios'
import { IP } from '../../App'
import swal from 'sweetalert'

export default function Basket() {
    const { searchResults } = useSearchContext();

    const deleteProduct = async (id) => {
        swal({
            title: "ایا از حذف محصول اطمینان دارید",
            icon: "warning",
            buttons: ["نه", "آره"]
        }).then(async result => {
            if (result) {
                try {
                    const response = await axios.delete(`${IP}/`);

                    if (response.status === 200) {
                        console.log(response.data)
                        swal({
                            title: "محصول باموفقیت از سبد خرید حذف شد",
                            icon: "success",
                            button: "باشه"
                        })
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        });
    };

    return (
        <>
            <Header />
            <div className="home-container">
                <Breadcrumb
                    links={[
                        { id: 1, title: "خانه", to: "" },
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

                                <div className="all-Products-more scroll-product">
                                    {
                                        searchResults &&
                                        searchResults.map(product => (
                                            <BoxProduct
                                                id={product.id}
                                                key={product.code}
                                                availability_count={product.availability_count}
                                                discount_percentage={product && product.sellers[0] && product.sellers[0].discount_percentage}
                                                price={product && product.sellers[0] && product.sellers[0].price}
                                                old_price={product && product.sellers[0] && product.sellers[0].old_price}
                                                image={product.image}
                                                name={product.name}
                                                model={product.model}
                                                is_discount={product && product.sellers[0] && product.sellers[0].is_discount}
                                                existence={product.availability_status}
                                            />
                                        ))
                                    }
                                </div>
                            </ProductsWrapper>
                        </> :
                        <>
                            <div className="basket-items-container">
                                <BasketItem deleteProduct={deleteProduct} />
                                <BasketItem />
                                <BasketItem />
                                <BasketItem />
                                <BasketItem />
                                <BasketItem />
                            </div>
                            <TotalAmount />
                            {/* <div className='d-flex flex-column justify-content-center align-items-center'>
                                <img src="../../../public/Images/empty-cart.svg" alt="" />
                                <p className='text-empty-basket'> سبد خرید شما خالی است !</p>
                            </div> */}

                        </>
                }

            </div>
            <Footer />
        </>
    )
}
