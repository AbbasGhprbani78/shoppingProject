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
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import { IP } from '../../App.jsx'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Category() {

    const [showBoxFilter, setShowBoxFilter] = useState(false)
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [valuePrice, setValuePrice] = useState({});
    const [showDrop, setShowDrop] = useState(false)
    const [mainContent, setMainContent] = useState('مرتب سازی براساس')
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
                price: valuePrice
            };

            if (selectedBrands.length > 0) {
                finalFilter.brands = selectedBrands;
            }

            const response = await axios.post(`${IP}`, finalFilter);
            if (response.status === 200) {
                console.log(response.data);
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
                        />
                        <FilterPrice
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
                            <FilterBrands
                                selectedBrands={selectedBrands}
                                onBrandToggle={handleBrandToggle}
                                removeFilterBrand={removeFilterBrand}
                            />
                            <FilterPrice
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
                                title="کاشی ها"
                                link={"#"}
                                isMore={false}
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










// const [selectedMaterail, setSelectedMaterail] = useState([]);

{/* <FilterMaterial
                                selectedMaterail={selectedMaterail}
                                handleMaterialoggle={handleMaterialoggle}
                                removeFilterMaterial={removeFilterMaterial}
                            /> */}

// const removeFilterMaterial = () => {
//     setSelectedMaterail([])
// }

// const handleMaterialoggle = (id, value) => {
//     setSelectedMaterail(prevSelectedMaterial => {
//         const index = prevSelectedMaterial.findIndex(material => material.id === id);
//         if (index !== -1) {

//             const updatedMaterial = [...prevSelectedMaterial.slice(0, index), ...prevSelectedMaterial.slice(index + 1)];
//             return updatedMaterial;
//         } else {

//             return [...prevSelectedMaterial, { id: id, material: value }];
//         }
//     });
// };