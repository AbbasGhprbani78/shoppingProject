import React, { useContext, useEffect, useState } from 'react'
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
import { Col } from 'react-bootstrap'
import AuthContext from '../../Context/AuthContext'
import { useLocation } from 'react-router-dom';

export default function Basket() {
    const { searchResults } = useSearchContext();
    const [allProduct, setAllProduct] = useState(null);
    const authContext = useContext(AuthContext);
    const { pathname } = useLocation();

    const getAllProductBasket = async () => {
        const access = localStorage.getItem("user")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/product/cart-detail/`, {
                headers
            })
            if (response.status === 200) {
                setAllProduct(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteProduct = async (id) => {
        const access = localStorage.getItem("user")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        const body = {
            detail_id: id
        }
        swal({
            title: "ایا از حذف محصول اطمینان دارید",
            icon: "warning",
            buttons: ["نه", "آره"]
        }).then(async result => {
            if (result) {
                try {
                    const response = await axios.post(`${IP}/product/remove-order/`, body, {
                        headers
                    });

                    if (response.status === 200) {
                        swal({
                            title: "محصول باموفقیت از سبد خرید حذف شد",
                            icon: "success",
                            button: "باشه"
                        })
                        getAllProductBasket()
                        authContext.numberBoughtProduct()
                    }
                } catch (error) {
                    console.log(error.message);
                }
            } else {

            }
        });
    };

    const increaseProductNumber = async (id) => {

        const access = localStorage.getItem("user")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        const body = {
            product_id: id,
            state: "increase"
        }
        try {
            const response = await axios.post(`${IP}/product/change-order-count/`, body, {
                headers
            })
            if (response.status === 200) {
                getAllProductBasket()
                authContext.numberBoughtProduct()
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const decreaseProductNumber = async (id) => {
        const access = localStorage.getItem("user")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        const body = {
            product_id: id,
            state: "decrease"
        }
        try {
            const response = await axios.post(`${IP}/product/change-order-count/`, body, {
                headers
            })
            if (response.status === 200) {
                getAllProductBasket()
                authContext.numberBoughtProduct()
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllProductBasket()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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

                                <div className="all-Products scroll-product">
                                    {
                                        searchResults &&
                                        searchResults.map(product => (
                                            <Col xs={6} md={3}>
                                                <BoxProduct
                                                    id={product && product.sellers[0] && product.sellers[0].id}
                                                    key={product.code}
                                                    availability_count={product.availability_count}
                                                    discount_percentage={product && product.sellers[0] && product.sellers[0].discount_percentage}
                                                    price={product && product.sellers[0] && product.sellers[0].price}
                                                    old_price={product && product.sellers[0] && product.sellers[0].old_price}
                                                    image={product.image}
                                                    name={product.name}
                                                    model={product.model}
                                                    is_discount={product && product.sellers[0] && product.sellers[0].is_discount}
                                                    existence={product && product.sellers[0] && product.sellers[0].availability_status}
                                                />
                                            </Col>
                                        ))
                                    }
                                </div>
                            </ProductsWrapper>
                        </> :
                        <>
                            {
                                allProduct && allProduct.order_details && allProduct.order_details.length > 0 ?
                                    <>
                                        <div className="basket-items-container">
                                            {
                                                allProduct.order_details.map(product => (
                                                    <BasketItem
                                                        key={product.order_detail_id}
                                                        id={product.order_detail_id}
                                                        discount={product.discount}
                                                        price={product.price_paid_per_item}
                                                        totalPrice={product.subtotal}
                                                        count={product.number_sold}
                                                        productId={product.product_seller_id}
                                                        name={product.name}
                                                        model={product.model}
                                                        image={product.image}
                                                        deleteProduct={deleteProduct}
                                                        increaseProductNumber={increaseProductNumber}
                                                        decreaseProductNumber={decreaseProductNumber}
                                                    />
                                                ))
                                            }
                                        </div>
                                        <TotalAmount
                                            getAllProductBasket={getAllProductBasket}
                                            total={allProduct.total_price}
                                            cart_id={allProduct.cart_id}
                                        />
                                    </> :
                                    <>
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                            <img src="../../../public/Images/empty-cart.svg" alt="" />
                                            <p className='text-empty-basket'> سبد خرید شما خالی است !</p>
                                        </div>
                                    </>
                            }
                        </>
                }

            </div>
            <Footer />
        </>
    )
}
