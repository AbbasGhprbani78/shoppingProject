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
    const [filterItem, setFilterItem] = useState([])
    const colRef = useRef(null);
    const { categoryName } = useParams()
    const { searchResults } = useSearchContext();

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

    const getProductCategory = async () => {
        try {
            const response = await axios.get(`${IP}/product/get-category-product/${categoryName}`)
            if (response.status === 200) {
                console.log(response)
                setAllCategoryProducts(response.data)
                setSortProducts(response.data.products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getFilterItem = async () => {

        try {
            const response = await axios.get(`${IP}/`)
            if (response.status === 200) {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        // getFilterItem()
    }, [])

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
                                title: `${categoryName}`
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
                                title={`${categoryName}`}
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






