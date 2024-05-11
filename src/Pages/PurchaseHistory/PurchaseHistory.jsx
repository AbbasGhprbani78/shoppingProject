import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import { useSearchContext } from '../../Context/SearchContext'
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper'
import './PurchaseHistory.css'
import BoxProduct from '../../Components/BoxProduct/BoxProduct';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import PurcheasHistoryItem from '../../Components/PurcheasHistoryItem/PurcheasHistoryItem';

function CustomTabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function PurchaseHistory() {
    const { searchResults } = useSearchContext();
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
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
                            <Breadcrumb
                                links={[
                                    { id: 1, title: "خانه", to: "" },
                                    {
                                        id: 2, title: `سوابق خرید`, to: "/purchasehistory"
                                    }
                                ]}
                            />
                            <div className="purchaseHistory-wrapper">
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="جاری" {...a11yProps(0)} />
                                            <Tab label="تحویل" {...a11yProps(1)} />
                                            <Tab label="مرجوعی" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                    <CustomTabPanel value={value} index={0}>
                                        <PurcheasHistoryItem />
                                        <PurcheasHistoryItem />
                                        <PurcheasHistoryItem />
                                        <PurcheasHistoryItem />
                                        <PurcheasHistoryItem />
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1}>
                                        Item Two
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={2}>
                                        Item Three
                                    </CustomTabPanel>
                                </Box>
                            </div>
                        </>
                }

            </div>
        </>

    )
}
