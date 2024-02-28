import { useEffect, useState } from 'react'
import './BasketItem.css'
import { Col } from 'react-bootstrap'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
                        {/* <div className="basketItem-wrapper">
                            <Card style={{ width: "100%" }}>
                                <CardMedia
                                    className='cardMedia'

                                />
                                <div style={{ height: "140px", width: "100%" }}>
                                    <img style={{ height: "100%", width: "100%" }} src="../../../public/Images/12.jfif" alt="" />
                                </div>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </div> */}
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
                                                <p className='basket-name'>یرالات ی یرالات ی شیرالات یک</p>
                                                <p className="basket-model">مدل 0285مدل 0285 مدل 0285</p>
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
