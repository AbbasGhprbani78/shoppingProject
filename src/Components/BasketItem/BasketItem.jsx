import { useEffect, useState } from 'react'
import './BasketItem.css'
import { Col } from 'react-bootstrap'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IP } from '../../App';
import { useLocation } from 'react-router-dom';

export default function BasketItem({
    deleteProduct,
    increaseProductNumber,
    decreaseProductNumber,
    discount,
    price,
    totalPrice,
    count,
    name,
    model,
    id,
    image,
    productId

}) {
    const { pathname } = useLocation();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [value, setValue] = useState(count)

    const increaseCountHandler = () => {
        increaseProductNumber(productId);
        setValue(prevValue => prevValue + 1);
    }


    const decreaseCountHandler = () => {
        if (count === 1) {
            deleteProduct(id)
        } if (count > 1) {
            setValue(prevValue => prevValue - 1);
            decreaseProductNumber(productId)
        }
    }


    useEffect(() => {

        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {
                windowWidth < 992 ? (
                    <>
                        <div className='mobile-wrapper'>
                            <div className="delete-mobile-close">
                                <CloseIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => deleteProduct(id)}
                                />
                            </div>
                            <div className="img-mobile-wrapper">
                                <img src={`${IP}${image}`} alt="" className="img-mobile" />
                            </div>
                            <div className="mobile-wrapper-content">
                                <div className='first'>
                                    <div className="mobile-name-model-wrapper">
                                        <p className="mobile-name"> {name}</p>
                                        <p className="mobile-model"> {model}</p>
                                    </div>
                                    <div className='change-count-wrraper'>
                                        <div onClick={increaseCountHandler} className="increase-count"><AddIcon /></div>
                                        <div className="count-content">{value}</div>
                                        <div onClick={decreaseCountHandler} className="decrease-count"><RemoveIcon /></div>
                                    </div>
                                </div>
                                <div className="mobile-price">
                                    <p>قیمت</p>
                                    <div className='second'>
                                        <p className="basket-price">{price.toLocaleString("fa")}</p>
                                        <div style={{ marginRight: "5px" }} className="basket-currency">تومان</div>
                                    </div>
                                </div>
                                <div className="mobile-price-all">
                                    <p>کل</p>
                                    <div className='third'>
                                        <p className="basket-all-price">{totalPrice.toLocaleString("fa")}</p>
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
                                                onClick={() => deleteProduct(id)}
                                            />
                                            <div className="img-basket-item-wrapper">
                                                <img src={`${IP}${image}`} alt="" />
                                            </div>
                                            <div className="texts-wrapper">
                                                <p className='basket-name'>{name}</p>
                                                <p className="basket-model"> {model} </p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='text-center' md={3}>
                                        <div className="basket-price-wrapper">
                                            <p className="basket-price">{price.toLocaleString("fa")}</p>
                                            <div className="basket-currency">تومان</div>
                                        </div>
                                    </Col>
                                    <Col className='text-center' md={3}>
                                        <div className="basket-number-wrapper">
                                            <div className='change-count-wrraper'>
                                                <div onClick={increaseCountHandler} className="increase-count"><AddIcon /></div>
                                                <div className="count-content">{value}</div>
                                                <div onClick={decreaseCountHandler} className="decrease-count"><RemoveIcon /></div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='text-center' md={3}>
                                        <div className="basket-all-price-wrapper">
                                            <p className="basket-all-price">{totalPrice.toLocaleString("fa")}</p>
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


// const handleValueChange = (event) => {
//     const newValue = parseInt(event.target.value);
//     if (!isNaN(newValue)) {
//         setValue(newValue);
//         if (newValue > count) {
//             increaseProductNumber(productId);
//         } else if (newValue < count) {
//             if (count === 1) {
//                 deleteProduct(id)
//                 setValue(1);
//             } if (count > 1) {
//                 decreaseProductNumber(productId)
//             }
//         }
//         if (newValue < 1) {
//             setValue(1)
//         }
//     }
// };

{/* <TextField
                                                type="number"
                                                variant="outlined"
                                                className="basket-number"
                                                inputProps={{ min: 0 }}
                                                value={value}
                                                onChange={handleValueChange}
                                            /> */}