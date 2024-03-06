import React, { useState, useEffect } from 'react';
import './FilterPrice.css';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Slider from '@mui/material/Slider';

const MIN_PRICE = 100000;
const MAX_PRICE = 10000000;

export default function FilterPrice({ setValuePrice }) {
    const [value, setValue] = useState([MIN_PRICE, MAX_PRICE]);
    const [sliderValue, setSliderValue] = useState([0, 1]);

    useEffect(() => {
        const calculateSliderValue = (val) => {
            const range = MAX_PRICE - MIN_PRICE;
            const relativeMin = (val[0] - MIN_PRICE) / range;
            const relativeMax = (val[1] - MIN_PRICE) / range;
            return [relativeMin, relativeMax];
        };

        setSliderValue(calculateSliderValue(value));
    }, [value]);

    const handleChange = (event, newValue) => {
        setSliderValue(newValue);

        const range = MAX_PRICE - MIN_PRICE;
        const newValueMin = Math.round(MIN_PRICE + newValue[0] * range);
        const newValueMax = Math.round(MIN_PRICE + newValue[1] * range);

        setValue([newValueMin, newValueMax]);
        setValuePrice({ from: value[0], to: value[1] })
    };

    const handleInputChange = (event) => {
        const id = event.target.id;
        const newValue = parseInt(event.target.value);

        if (id === 'fromInput') {
            setValue([newValue, value[1]]);
            setValuePrice({ from: value[0], to: value[1] })

        } else if (id === 'toInput') {
            setValue([value[0], newValue]);
            setValuePrice({ from: value[0], to: value[1] })

        }

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
                    value={sliderValue}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
                <div className="input-price-wrapper">
                    <label className='input-price-title' htmlFor="fromInput">از</label>
                    <input
                        id="fromInput"
                        type="number"
                        className='input-price'
                        onChange={handleInputChange}
                        value={value[0]}
                    />
                </div>
                <div className="input-price-wrapper">
                    <label className='input-price-title' htmlFor="toInput">تا</label>
                    <input
                        id="toInput"
                        type="number"
                        className='input-price'
                        onChange={handleInputChange}
                        value={value[1]}
                    />
                </div>
            </div>
        </>
    )
}
