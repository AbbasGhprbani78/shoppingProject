import React from 'react'
import './FilterMaterial.css'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';

export default function FilterMaterial({ selectedMaterail = [], handleMaterialoggle, removeFilterMaterial }) {

    const handleCheckboxChange = (id, value) => {
        handleMaterialoggle(id, value);
    };
    return (
        <>
            <div className="material-filter">
                <div className="material-filter-top d-flex justify-content-between">
                    <div className="material-icon">
                        <DiamondOutlinedIcon style={{ marginLeft: "5px" }} />
                        جنس
                    </div>
                    <div className='delete-filter-material' onClick={removeFilterMaterial}>حذف فیلتر</div>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input
                        id='1'
                        type="checkbox"
                        className='checkbox-filter-item'
                        value={"جنس1"}
                        onChange={() => handleCheckboxChange('1', "جنس1")}
                    />
                    <label htmlFor='1' className='material-item'>1جنس</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input
                        id='2'
                        type="checkbox"
                        className='checkbox-filter-item'
                        value={"جنس2"}
                        onChange={() => handleCheckboxChange('2', "جنس2")}
                    />
                    <label htmlFor='2' className='material-item'>2جنس</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input
                        id='3'
                        type="checkbox"
                        className='checkbox-filter-item'
                        value={"جنس3"}
                        onChange={() => handleCheckboxChange('3', "جنس3")}
                    />
                    <label htmlFor='3' className='material-item'>3جنس</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input
                        id='4'
                        type="checkbox"
                        className='checkbox-filter-item'
                        value={"جنس4"}
                        onChange={() => handleCheckboxChange('4', "جنس4")}
                    />
                    <label htmlFor='4' className='material-item'>4جنس</label>
                </div>
                <div className='checkbox-filter-item-wrapper'>
                    <input
                        id='5'
                        type="checkbox"
                        className='checkbox-filter-item'
                        value={"جنس5"}
                        onChange={() => handleCheckboxChange('5', "جنس5")}
                    />
                    <label htmlFor='5' className='material-item'>5جنس</label>
                </div>
            </div>
        </>
    )
}
