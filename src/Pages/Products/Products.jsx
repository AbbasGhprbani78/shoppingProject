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
export default function Products() {

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
                console.log(response.data)
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
                                            <BoxProduct
                                                key={product.code}
                                                availability_count={product.availability_count}
                                                discount_percentage={product && product.sellers[0] && product.sellers[0].discount_percentage}
                                                price={product && product.sellers[0] && product.sellers[0].price}
                                                old_price={product && product.sellers[0] && product.sellers[0].old_price}
                                                image={product.image}
                                                name={product.name}
                                                model={product.model}
                                                is_discount={product && product.sellers[0] && product.sellers[0].is_discount}
                                            />
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
                                <div className="all-Products">
                                    {
                                        shownProducts &&
                                        shownProducts.map(product => (
                                            <BoxProduct
                                                key={product.product_or_service_code}
                                                availability_count={product.availability_count}
                                                discount_percentage={product.discount_percentage}
                                                price={product.price}
                                                old_price={product.discounted_price}
                                                image={product.image}
                                                name={product.name}
                                                model={product.model}
                                                is_discount={product.is_discount}
                                            />
                                        ))
                                    }
                                    {
                                        showTopProduct &&
                                        showTopProduct.map(product => (
                                            <BoxProduct
                                                key={product.product_or_service_code}
                                                availability_count={product.availability_count}
                                                discount_percentage={product.discount_percentage}
                                                price={product.price}
                                                old_price={product.price_with_discount}
                                                image={product.product_or_service.image}
                                                name={product.product_or_service.name}
                                                model={product.product_or_service.model}
                                                is_discount={product.is_discount}
                                            />
                                        ))
                                    }
                                </div>
                            </ProductsWrapper >

                            {
                                issue === "topssellers" ?
                                    <Paginations
                                        items={topProduct}
                                        showcount={2}
                                        setShownProducts={setShowTopProduct}
                                        pathname={`/products/${issue}`}
                                    />
                                    : <Paginations
                                        items={products}
                                        showcount={2}
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
