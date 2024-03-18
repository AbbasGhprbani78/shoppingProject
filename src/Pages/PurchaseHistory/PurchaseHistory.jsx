import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import { useSearchContext } from '../../Context/SearchContext'
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper'
import './PurchaseHistory.css'
import BoxProduct from '../../Components/BoxProduct/BoxProduct';
import { Col } from 'react-bootstrap';
export default function PurchaseHistory() {
    const { searchResults } = useSearchContext();
    return (
        <>
            <Header />
            <div className="home-container">
                {
                    searchResults && searchResults.length > 0 ?
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
                            <Breadcrumb
                                links={[
                                    { id: 1, title: "خانه", to: "" },
                                    {
                                        title: `سوابق خرید`
                                    }
                                ]}
                            />

                        </>
                }

            </div>
            <Footer />
        </>

    )
}
