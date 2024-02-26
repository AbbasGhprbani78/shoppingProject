
import React, { useState } from 'react'
import './FilterPrice.css'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Slider from '@mui/material/Slider';
export default function FilterPrice() {
    const [value, setValue] = useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="filterPrice-wrapper">
                <div className="filter-price-title">
                    <MonetizationOnOutlinedIcon />
                    قیمت
                </div>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
                <div className="input-price-wrapper">
                    <label className='input-price-title' htmlFor="">از</label>
                    <input type="number" className='input-price' />
                </div>
                <div className="input-price-wrapper">
                    <label className='input-price-title' htmlFor="">تا</label>
                    <input type="number" className='input-price' />
                </div>
            </div>
        </>
    )
}
