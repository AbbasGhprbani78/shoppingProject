import React, { useState, useEffect } from 'react';
import './FilterPrice.css';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Slider from '@mui/material/Slider';



export default function FilterPrice({ setValuePrice, priceFilter, classProp }) {

    const MIN_PRICE = priceFilter && priceFilter[0] && priceFilter[0].min_price;
    const MAX_PRICE = priceFilter && priceFilter[0] && priceFilter[0].max_price;

    const [value, setValue] = useState(null);
    const [sliderValue, setSliderValue] = useState([MIN_PRICE, MAX_PRICE]);

    useEffect(() => {
        setValue([MIN_PRICE, MAX_PRICE])
    }, [MIN_PRICE, MAX_PRICE])


    const handleChange = (event, newValue) => {
        setSliderValue(newValue);
        setValuePrice({ from: sliderValue[0], to: sliderValue[1] })
        setValue([sliderValue[0], sliderValue[1]]);
    };

    const handleInputChange = (event) => {
        const id = event.target.id;
        const newValue = parseInt(event.target.value);

        if (id === 'fromInput') {
            setValue([newValue, value[1]]);
            setSliderValue([newValue, value[1]])
            setValuePrice({ from: newValue, to: value[1] });
        } else if (id === 'toInput') {
            setValue([value[0], newValue]);
            setSliderValue([value[0], newValue])
            setValuePrice({ from: value[0], to: newValue });
        }
    };
    const valuetext = (value) => {
        return `${value}`;
    };

    return (
        <>
            <div className={`filterPrice-wrapper ${classProp}`}>
                <div className="filter-price-title">
                    <MonetizationOnOutlinedIcon />
                    قیمت
                </div>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={sliderValue}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                />
                <div className="input-price-wrapper">
                    <label className='input-price-title' htmlFor="fromInput">از</label>
                    <input
                        id="fromInput"
                        type="number"
                        className='input-price'
                        onChange={handleInputChange}
                        value={value && value[0]}
                    />
                </div>
                <div className="input-price-wrapper">
                    <label className='input-price-title' htmlFor="toInput">تا</label>
                    <input
                        id="toInput"
                        type="number"
                        className='input-price'
                        onChange={handleInputChange}
                        value={value && value[1]}
                    />
                </div>
            </div>
        </>
    )
}


// useEffect(() => {
//     const calculateSliderValue = (val) => {
//         const range = MAX_PRICE - MIN_PRICE;
//         const relativeMin = (val[0] - MIN_PRICE) / range;
//         const relativeMax = (val[1] - MIN_PRICE) / range;
//         return [relativeMin, relativeMax];
//     };

//     if (
//         typeof value === 'number' &&
//         typeof MIN_PRICE === 'number' &&
//         typeof MAX_PRICE === 'number'
//     ) {
//         setSliderValue(calculateSliderValue(value));
//     }
// }, [value, MIN_PRICE, MAX_PRICE]);
