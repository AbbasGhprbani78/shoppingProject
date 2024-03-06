import { useEffect, useState } from 'react'
import './BasketItem.css'
import { Col } from 'react-bootstrap'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

export default function BasketItem() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {

        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    return (
        <>
            {
                windowWidth < 992 ? (
                    <>
                        <div className='mobile-wrapper'>
                            <div className="delete-mobile-close">
                                <CloseIcon style={{ cursor: "pointer" }} />
                            </div>
                            <div className="img-mobile-wrapper">
                                <img src="../../../public/Images/12.jfif" alt="" className="img-mobile" />
                            </div>
                            <div className="mobile-wrapper-content">
                                <div className='first'>
                                    <div className="mobile-name-model-wrapper">
                                        <p className="mobile-name">شیرالات یک</p>
                                        <p className="mobile-model">مدل 0285</p>
                                    </div>
                                    <TextField />
                                </div>
                                <div className="mobile-price">
                                    <p>قیمت</p>
                                    <div className='second'>
                                        <p className="basket-price">6.000.000</p>
                                        <div style={{ marginRight: "5px" }} className="basket-currency">تومان</div>
                                    </div>
                                </div>
                                <div className="mobile-price-all">
                                    <p>کل</p>
                                    <div className='third'>
                                        <p className="basket-all-price">6.000.000</p>
                                        <div style={{ marginRight: "5px" }} className="basket-currency">تومان</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>) :
                    (
                        <>
                            <div className="basketItem-wrapper">
                                <div className="basket-tops-title d-flex align-items-center">
                                    <Col className='basket-title' md={3}>
                                        اسم محصول
                                    </Col>
                                    <Col className='basket-title' md={3}>
                                        قیمت
                                    </Col>
                                    <Col className='basket-title' md={3}>
                                        تعداد
                                    </Col>
                                    <Col className='basket-title' md={3}>
                                        قیمت کل
                                    </Col>
                                </div>
                                <div className="basket-bottom d-flex align-items-center">
                                    <Col className='text-center' md={3}>
                                        <div className="basket-img-text-icon-wrapper">
                                            <DeleteOutlineOutlinedIcon
                                                style={{ color: "#f14444", cursor: "pointer" }}

                                            />
                                            <div className="img-basket-item-wrapper">
                                                <img src="../../../public/Images/12.jfif" alt="" />
                                            </div>
                                            <div className="texts-wrapper">
                                                <p className='basket-name'> شیرالات یک</p>
                                                <p className="basket-model"> مدل 0285</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='text-center' md={3}>
                                        <div className="basket-price-wrapper">
                                            <p className="basket-price">6.000.000</p>
                                            <div className="basket-currency">تومان</div>
                                        </div>
                                    </Col>
                                    <Col className='text-center' md={3}>
                                        <div className="basket-number-wrapper">
                                            <TextField
                                                type="number"
                                                variant="outlined"
                                                className="basket-number"
                                                inputProps={{ min: 0 }}
                                            />

                                        </div>
                                    </Col>
                                    <Col className='text-center' md={3}>
                                        <div className="basket-all-price-wrapper">
                                            <p className="basket-all-price">6.000.000</p>
                                            <div className="basket-currency">تومان</div>
                                        </div>
                                    </Col>
                                </div>
                            </div >
                        </>)
            }

        </>
    )
}