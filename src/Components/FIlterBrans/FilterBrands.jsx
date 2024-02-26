import React from 'react'
import './FilterBrands.css'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
export default function FilterBrands() {
    return (
        <>
            <div className="brands-filter">
                <div className="brands-filter-top d-flex justify-content-between">
                    <div className="brand-icon">
                        <SellOutlinedIcon style={{ marginLeft: "5px" }} />
                        برند ها
                    </div>
                    <div className='delete-filter-brand'>حذف فیلتر</div>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input id='1' type="checkbox" className='checkbox-filter-item' />
                    <label htmlFor='1' className='brand-item'>برند</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input id='2' type="checkbox" className='checkbox-filter-item' />
                    <label htmlFor='2' className='brand-item'>برند</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input id='3' type="checkbox" className='checkbox-filter-item' />
                    <label htmlFor='3' className='brand-item'>برند</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input id='4' type="checkbox" className='checkbox-filter-item' />
                    <label htmlFor='4' className='brand-item'>برند</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input id='5' type="checkbox" className='checkbox-filter-item' />
                    <label htmlFor='5' className='brand-item'>برند</label>
                </div>
            </div>
        </>
    )
}
