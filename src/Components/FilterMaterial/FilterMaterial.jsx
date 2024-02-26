import React from 'react'
import './FilterMaterial.css'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
export default function FilterMaterial() {
    return (
        <>
            <div className="material-filter">
                <div className="material-filter-top d-flex justify-content-between">
                    <div className="material-icon">
                        <DiamondOutlinedIcon style={{ marginLeft: "5px" }} />
                        جنس
                    </div>
                    <div className='delete-filter-material'>حذف فیلتر</div>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input id='1' type="checkbox" className='checkbox-filter-item' />
                    <label htmlFor='1' className='material-item'>جنس</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input id='2' type="checkbox" className='checkbox-filter-item' />
                    <label htmlFor='2' className='material-item'>جنس</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input id='3' type="checkbox" className='checkbox-filter-item' />
                    <label htmlFor='3' className='material-item'>جنس</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input id='4' type="checkbox" className='checkbox-filter-item' />
                    <label htmlFor='4' className='material-item'>جنس</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input id='5' type="checkbox" className='checkbox-filter-item' />
                    <label htmlFor='5' className='material-item'>جنس</label>
                </div>
            </div>
        </>
    )
}
