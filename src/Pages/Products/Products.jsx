import React, { useEffect, useState } from 'react'
import './Products.css'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import axios from 'axios'
import { IP } from '../../App'
import { useParams } from 'react-router-dom'
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper'
import BoxProduct from '../../Components/BoxProduct/BoxProduct'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import Paginations from '../../Components/Pagination/Pagination'
import { useSearchContext } from '../../Context/SearchContext'
import { useLocation } from 'react-router-dom';
import { Col } from 'react-bootstrap'
export default function Products() {
    const { pathname } = useLocation();
    const [products, setProducts] = useState([])
    const [topProduct, setTopProduct] = useState([])
    const [shownProducts, setShownProducts] = useState([])
    const [showTopProduct, setShowTopProduct] = useState([])
    const { searchResults } = useSearchContext();
    const { issue } = useParams()

    useEffect(() => {
        if (issue === "offs") {
            getProductOffs()
        } if (issue === "newest") {
            getProductNewest()
        } if (issue === "topssellers") {
            getProductTopSelling()
        }
    }, [])


    const getProductOffs = async () => {

        try {
            const response = await axios.get(`${IP}/product/discount-products/`);
            if (response.status === 200) {
                setProducts(response.data.products)

            }
        } catch (error) {
            console.log(error.message);
        }
    }


    const getProductNewest = async () => {
        try {
            const response = await axios.get(`${IP}/product/last-products/`);
            if (response.status === 200) {
                setProducts(response.data.products)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const getProductTopSelling = async () => {

        try {
            const response = await axios.get(`${IP}/product/all-top-selling-products/`);
            if (response.status === 200) {
                setTopProduct(response.data.products)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

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
                            title: `${issue}`
                        }
                    ]}
                />
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
                                            <Col xs={6} md={3} style={{ padding: "5px" }}>
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
                            <ProductsWrapper
                                isMore={false}
                                title={issue === "newest" ? "جدیدترین ها" : issue === "topssellers" ? "پرفروش ها" : "تخفیف خورده ها"}
                            >
                                {
                                    showTopProduct && showTopProduct.length > 0 || shownProducts && shownProducts.length > 0 ?
                                        <>
                                            <div className="all-Products">
                                                {
                                                    shownProducts &&
                                                    shownProducts.map(product => (
                                                        <Col xs={6} md={4}>
                                                            <BoxProduct
                                                                id={product.id}
                                                                key={product.product_or_service_code}
                                                                availability_count={product.availability_count}
                                                                discount_percentage={product.discount_percentage}
                                                                price={product.price}
                                                                old_price={product.discounted_price}
                                                                image={product.image}
                                                                name={product.name}
                                                                model={product.model}
                                                                is_discount={product.is_discount}
                                                                existence={product.availability_status}
                                                            />
                                                        </Col>

                                                    ))
                                                }
                                                {
                                                    showTopProduct &&
                                                    showTopProduct.map(product => (
                                                        <Col xs={6} md={4}>
                                                            <BoxProduct
                                                                id={product.id}
                                                                key={product.product_or_service_code}
                                                                availability_count={product.availability_count}
                                                                discount_percentage={product.discount_percentage}
                                                                price={product.price}
                                                                old_price={product.price_with_discount}
                                                                image={product.image}
                                                                name={product.name}
                                                                model={product.model}
                                                                is_discount={product.is_discount}
                                                                existence={product.availability_status}
                                                            />
                                                        </Col>

                                                    ))
                                                }
                                            </div>
                                        </> :
                                        <>
                                            <div className='d-flex justify-content-center'>
                                                <div class="spinner"></div>
                                            </div>
                                        </>
                                }

                            </ProductsWrapper >

                            {
                                issue === "topssellers" ?
                                    <Paginations
                                        items={topProduct}
                                        showcount={4}
                                        setShownProducts={setShowTopProduct}
                                        pathname={`/products/${issue}`}
                                    />
                                    : <Paginations
                                        items={products}
                                        showcount={4}
                                        setShownProducts={setShownProducts}
                                        pathname={`/products/${issue}`}
                                    />
                            }
                        </>
                }


            </div>
            <Footer />
        </>

    )
}
