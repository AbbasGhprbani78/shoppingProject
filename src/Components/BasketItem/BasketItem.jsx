import { useEffect, useState } from 'react'
import './BasketItem.css'
import { Col } from 'react-bootstrap'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
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
                        <div className="basketItem-wrapper basketItem-mobile">
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
