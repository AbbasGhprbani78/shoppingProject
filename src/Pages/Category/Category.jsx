import React, { useState, useEffect, useRef } from 'react'
import './Category.css'
import Header from '../../Components/Header/Header.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb.jsx'
import { Col, Row } from 'react-bootstrap'
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper.jsx'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterBrands from '../../Components/FIlterBrans/FilterBrands.jsx';
import FilterPrice from '../../Components/FIlterPrice/FIlterPrice.jsx'
import BoxProduct from '../../Components/BoxProduct/BoxProduct.jsx';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import { IP } from '../../App.jsx'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useParams } from 'react-router-dom'
import { useSearchContext } from '../../Context/SearchContext.jsx'
export default function Category() {

    const [allcategoryProducts, setAllCategoryProducts] = useState([])
    const [sortProducts, setSortProducts] = useState([])
    const [showBoxFilter, setShowBoxFilter] = useState(false)
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [valuePrice, setValuePrice] = useState({});
    const [showDrop, setShowDrop] = useState(false)
    const [mainContent, setMainContent] = useState('مرتب سازی براساس')
    const [brandFilter, setBrandFilter] = useState(null)
    const [priceFilter, setpriceFilter] = useState([])
    const colRef = useRef(null);
    const { categoryName } = useParams()
    const { searchResults } = useSearchContext();
    const [allProduct, setAllProduct] = useState(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (colRef.current && !colRef.current.contains(event.target)) {
                setShowBoxFilter(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [colRef]);

    const handleBrandToggle = (id) => {
        setSelectedBrands(prevSelectedBrands => {
            const index = prevSelectedBrands.findIndex(brand => brand.id === id);
            if (index !== -1) {

                const updatedBrands = [...prevSelectedBrands.slice(0, index), ...prevSelectedBrands.slice(index + 1)];
                return updatedBrands;
            } else {

                return [...prevSelectedBrands, { id: id }];
            }
        });

    };

    const openFilterBox = () => {
        setShowBoxFilter(true);
    };

    const removeFilterBrand = () => {
        setSelectedBrands([])
    };

    const sendFinalFilter = async () => {

        try {

            let finalFilter = {
                price: valuePrice,
                category: categoryName
            };

            console.log(finalFilter)

            if (selectedBrands.length > 0) {
                finalFilter.brands = selectedBrands;
            }
            const response = await axios.post(`${IP}/product/product-filter/`, finalFilter);
            if (response.status === 200) {
                setSortProducts(response.data.products)
                setShowBoxFilter(false)
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    const showList = () => {
        setShowDrop(prevShow => !prevShow)
    }

    const chnageMainTextContent = (e) => {
        setMainContent(e.target.textContent)
    }

    const getProductCategory = async () => {
        try {
            const response = await axios.get(`${IP}/product/get-category-product/${categoryName}`)
            if (response.status === 200) {
                console.log(response)
                setAllCategoryProducts(response.data)
                setSortProducts(response.data.products)
                setAllProduct(response.data.products)
                setpriceFilter(response.data.price_range)
                setBrandFilter(response.data.brands)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProductCategory()
    }, [categoryName])


    useEffect(() => {
        switch (mainContent) {
            case "بیشترین قیمت": {
                setSortProducts(allcategoryProducts.high_price_product)
                break;
            }
            case "کم ترین قیمت": {
                setSortProducts(allcategoryProducts.low_price_product)
                break;
            }
            case "جدیدترین": {
                setSortProducts(allcategoryProducts.last_products)
                break;
            }
            default: {
                setSortProducts(allcategoryProducts.products)
            }
        }
    }, [mainContent]);

    return (

        <>
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
                        <FilterBrands
                            selectedBrands={selectedBrands}
                            onBrandToggle={handleBrandToggle}
                            removeFilterBrand={removeFilterBrand}
                            brandFilter={brandFilter}
                        />
                        <FilterPrice
                            setValuePrice={setValuePrice}
                            priceFilter={priceFilter}
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
                                title: `${categoryName}`
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

                                <button className="filter-btn-small d-lg-none" onClick={openFilterBox}>
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
                                        <FilterBrands
                                            selectedBrands={selectedBrands}
                                            onBrandToggle={handleBrandToggle}
                                            removeFilterBrand={removeFilterBrand}
                                            brandFilter={brandFilter}
                                        />
                                        <FilterPrice
                                            setValuePrice={setValuePrice}
                                            priceFilter={priceFilter}
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
                                            title={`${categoryName}`}
                                            link={"#"}
                                            isMore={false}
                                        >
                                            <div className="all-Products scroll-product">
                                                {
                                                    allProduct && allProduct.length > 0 ?
                                                        <>
                                                            {
                                                                sortProducts && sortProducts.length > 0 ?
                                                                    <>
                                                                        {
                                                                            sortProducts.map(product => (
                                                                                <Col xs={6} md={4} style={{ padding: "5px" }}>
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
                                                                        محصولی یافت نشد
                                                                    </>
                                                            }
                                                        </> :
                                                        <>
                                                            <div className='d-flex justify-content-center w-100'>
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

        </>
    )
}






