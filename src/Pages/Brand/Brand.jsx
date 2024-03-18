import React, { useEffect, useState, useRef } from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import './Brand.css'
import axios from 'axios'
import { IP } from '../../App'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import { useParams } from 'react-router-dom'
import { useSearchContext } from '../../Context/SearchContext.jsx'
import BoxProduct from '../../Components/BoxProduct/BoxProduct.jsx'
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper.jsx'
import CloseIcon from '@mui/icons-material/Close';
import { Col, Row } from 'react-bootstrap'
import FilterBrands from '../../Components/FIlterBrans/FilterBrands';
import FilterPrice from '../../Components/FIlterPrice/FIlterPrice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function Brand() {
    const [showBoxFilter, setShowBoxFilter] = useState(false)
    const colRef = useRef(null);
    const { id } = useParams();
    const { brandName } = useParams()
    const { searchResults } = useSearchContext();
    const [showDrop, setShowDrop] = useState(false)
    const [mainContent, setMainContent] = useState('مرتب سازی براساس')
    const [sortProducts, setSortProducts] = useState([])
    const [priceFilter, setpriceFilter] = useState([])
    const [productFilter, setProductFilter] = useState([])
    const [valuePrice, setValuePrice] = useState({});
    const [allProduct, setAllProduct] = useState(null)


    const chnageMainTextContent = (e) => {
        setMainContent(e.target.textContent)
    }

    const showList = () => {
        setShowDrop(prevShow => !prevShow)
    }

    const getProductsBrand = async () => {
        try {
            const response = await axios.get(`${IP}/product/slider-detail/${id}`)
            if (response.status === 200) {
                setAllProduct(response.data.products)
                setSortProducts(response.data.products)
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    const getFilterBrand = async () => {
        try {

            const response = await axios.get(`${IP}/product/get-brand-product/${brandName}`)
            if (response.status === 200) {
                console.log(response.data)
                setProductFilter(response.data)
                setpriceFilter(response.data.price_range)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const sendFinalFilter = async () => {
        try {

            let finalFilter = {
                price: valuePrice,
                brand: brandName
            };

            const response = await axios.post(`${IP}/product/brand-product-filter/`, finalFilter);
            if (response.status === 200) {
                setShowBoxFilter(false)
                setSortProducts(response.data.products)
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {

        switch (mainContent) {
            case "بیشترین قیمت": {
                setSortProducts(productFilter.high_price_product)
                break;
            }
            case "کم ترین قیمت": {
                setSortProducts(productFilter.low_price_product)
                break;
            }
            case "جدیدترین": {
                setSortProducts(productFilter.last_products)
                break;
            }
            default: {
                setSortProducts(allProduct)
            }
        }
    }, [mainContent]);


    useEffect(() => {
        getProductsBrand()
    }, [])

    useEffect(() => {
        getFilterBrand();
    }, [mainContent]);



    return (
        <>
            <div className={`openfilter-container ${showBoxFilter ? "activefilterbox" : ""}`}>
                <Col md={12} className='filters-col boxFilters' ref={colRef} >
                    <div className="filterTitle">
                        <FilterAltOutlinedIcon style={{ marginLeft: "5px" }} />
                        فیلتر ها
                        <CloseIcon
                            className='d-lg-none'
                            style={{ position: "absolute", left: "0" }}
                            onClick={() => setShowBoxFilter(false)}
                        />
                    </div>
                    <FilterPrice
                        priceFilter={priceFilter}
                        setValuePrice={setValuePrice}
                    />
                    <button className='btn-done-filter' onClick={sendFinalFilter}>اعمال فیلتر ها</button>
                </Col>
            </div>
            <Header />
            <div className="home-container">
                <Breadcrumb
                    links={[
                        { id: 1, title: "خانه", to: "" },
                        {
                            title: `${brandName}`
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
                            <button className="filter-btn-small d-lg-none" onClick={() => setShowBoxFilter(true)}>
                                فیلتر ها
                                <span style={{ marginRight: "45px" }}> <KeyboardArrowDownIcon /></span>
                            </button>
                            <Row className="category-wrapper d-flex  justify-content-between">
                                <Col md={3} className='filters-col'>
                                    <div className="filterTitle">
                                        <FilterAltOutlinedIcon style={{ marginLeft: "5px" }} />
                                        فیلتر ها
                                        <CloseIcon
                                            className='d-lg-none'
                                            style={{ position: "absolute", left: "0" }}
                                            onClick={() => setShowBoxFilter(false)}
                                        />
                                    </div>
                                    <FilterPrice
                                        priceFilter={priceFilter}
                                        classProp={"qqqq"}
                                        setValuePrice={setValuePrice}
                                    />

                                    <button className='btn-done-filter' onClick={sendFinalFilter}>اعمال فیلتر ها</button>
                                </Col>
                                <Col className='category-product-wrapper mt-4' xs={12} md={9} style={{ position: "relative" }}>
                                    <div className='dropdown'>
                                        <p
                                            className='mainitem'
                                            onClick={showList}>
                                            {mainContent}
                                            <KeyboardArrowDownIcon />
                                        </p>
                                        <ul className={`dropdown-list ${showDrop ? "showlist" : ""}`}>
                                            <li className='dropdown-item1' onClick={(e) => {
                                                chnageMainTextContent(e)
                                                setShowDrop(false)

                                            }}> مرتب سازی براساس</li>
                                            <li className='dropdown-item1' onClick={(e) => {
                                                chnageMainTextContent(e)
                                                setShowDrop(false)
                                            }}>بیشترین قیمت</li>
                                            <li className='dropdown-item1' onClick={(e) => {
                                                chnageMainTextContent(e)
                                                setShowDrop(false)
                                            }}>کم ترین قیمت</li>
                                            <li className='dropdown-item1' onClick={(e) => {
                                                chnageMainTextContent(e)
                                                setShowDrop(false)
                                            }}>جدیدترین</li>
                                        </ul>
                                    </div>
                                    <ProductsWrapper
                                        title={`${brandName}`}
                                        link={"#"}
                                        isMore={false}
                                    >
                                        <div className="all-Products scroll-product">
                                            {
                                                sortProducts ?
                                                    <>
                                                        {
                                                            sortProducts.map(product => (
                                                                <Col xs={6} md={4}>
                                                                    <BoxProduct
                                                                        id={product.id}
                                                                        key={product.code}
                                                                        availability_count={product.availability_count}
                                                                        discount_percentage={product.discount_percentage}
                                                                        price={product.price}
                                                                        old_price={product.old_price}
                                                                        image={product.image}
                                                                        name={product.name}
                                                                        model={product.model}
                                                                        is_discount={product.is_discount}
                                                                        existence={product.availability_status}
                                                                    />
                                                                </Col>

                                                            ))
                                                        }
                                                    </> :
                                                    <>
                                                        <div className='d-flex justify-content-center'>
                                                            <div class="spinner"></div>
                                                        </div>
                                                    </>

                                            }
                                        </div>
                                    </ProductsWrapper>

                                </Col>
                            </Row>
                        </>
                }
            </div>
            <Footer />
        </>
    )
}
