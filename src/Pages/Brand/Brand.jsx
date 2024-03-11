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
    const { brandName } = useParams()
    const { searchResults } = useSearchContext();
    const [showDrop, setShowDrop] = useState(false)
    const [mainContent, setMainContent] = useState('مرتب سازی براساس')


    const showList = () => {
        setShowDrop(prevShow => !prevShow)
    }

    const chnageMainTextContent = (e) => {
        setMainContent(e.target.textContent)
    }
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
                    <FilterBrands
                        selectedBrands={"selectedBrands"}
                        onBrandToggle={"handleBrandToggle"}
                        removeFilterBrand={""}
                    />
                    <FilterPrice
                        setValuePrice={""}
                    />
                    <button className='btn-done-filter' onClick={""}>اعمال فیلتر ها</button>
                </Col>
            </div>
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
                            <button className="filter-btn-small d-lg-none" onClick={""}>
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
                                        selectedBrands={""}
                                        onBrandToggle={""}
                                        removeFilterBrand={""}
                                    />
                                    <FilterPrice
                                        setValuePrice={''}
                                    />

                                    <button className='btn-done-filter' onClick={"sendFinalFilter"}>اعمال فیلتر ها</button>
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
                                            {/* {
                                                sortProducts &&
                                                sortProducts.map(product => (
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
                                            } */}
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
