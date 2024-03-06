import React from 'react';
import './FilterBrands.css';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

export default function FilterBrands({ selectedBrands = [], onBrandToggle, removeFilterBrand }) {
    const handleCheckboxChange = (id, value) => {
        onBrandToggle(id, value);
    };

    return (
        <div className="brands-filter">
            <div className="brands-filter-top d-flex justify-content-between">
                <div className="brand-icon">
                    <SellOutlinedIcon style={{ marginLeft: "5px" }} />
                    برند ها
                </div>
                <div className='delete-filter-brand' onClick={removeFilterBrand}>حذف فیلتر</div>
            </div>
            <div className='checkbox-filter-item-wrapper'>
                <input
                    id='1'
                    type="checkbox"
                    className='checkbox-filter-item'
                    value={"برند1"}
                    onChange={() => handleCheckboxChange('1', "برند1")}
                />
                <label htmlFor='1' className='brand-item'>1برند</label>
            </div>
            <div className='checkbox-filter-item-wrapper'>
                <input
                    id='2'
                    type="checkbox"
                    className='checkbox-filter-item'
                    value={"برند2"}
                    onChange={() => handleCheckboxChange('2', "برند2")}
                />
                <label htmlFor='2' className='brand-item'>2برند</label>
            </div>
            <div className='checkbox-filter-item-wrapper'>
                <input
                    id='3'
                    type="checkbox"
                    className='checkbox-filter-item'
                    value={"برند3"}
                    onChange={() => handleCheckboxChange('3', "برند3")}
                />
                <label htmlFor='3' className='brand-item'>3برند</label>
            </div>
            <div className='checkbox-filter-item-wrapper'>
                <input
                    id='4'
                    type="checkbox"
                    className='checkbox-filter-item'
                    value={"برند4"}
                    onChange={() => handleCheckboxChange('4', "برند4")}
                />
                <label htmlFor='4' className='brand-item'>4برند</label>
            </div>
            <div className='checkbox-filter-item-wrapper'>
                <input
                    id='5'
                    type="checkbox"
                    className='checkbox-filter-item'
                    value={"برند5"}
                    onChange={() => handleCheckboxChange('5', "برند5")}
                />
                <label htmlFor='5' className='brand-item'>5برند</label>
            </div>
        </div>
    );
}
