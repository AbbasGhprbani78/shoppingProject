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
import FilterMaterial from '../../Components/FilterMaterial/FilterMaterial.jsx'
import BoxProduct from '../../Components/BoxProduct/BoxProduct.jsx';
import Pagination from '../../Components/Pagination/Pagination.jsx';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

export default function Category() {

    const [showBoxFilter, setShowBoxFilter] = useState(false)
    const openFilterBox = () => {
        setShowBoxFilter(true)
    }
    const colRef = useRef(null);

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
                        <FilterBrands />
                        <FilterPrice />
                        <FilterMaterial />
                        <button className='btn-done-filter'>اعمال فیلتر ها</button>
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
                                title: "کاشی"
                            }
                        ]}
                    />
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
                            <FilterBrands />
                            <FilterPrice />
                            <FilterMaterial />
                            <button className='btn-done-filter'>اعمال فیلتر ها</button>
                        </Col>
                        <Col xs={12} md={9}>
                            <ProductsWrapper
                                title="کاشی ها"
                                link={"#"}
                            >
                                <div className="all-Products">
                                    <BoxProduct />
                                    <BoxProduct />
                                    <BoxProduct />
                                    <BoxProduct />
                                    <BoxProduct />
                                </div>
                            </ProductsWrapper>
                            <Pagination />
                        </Col>
                    </Row>
                </div>
                <Footer />
            </>

        </>
    )
}
