import React from 'react';
import './FilterBrands.css';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

export default function FilterBrands({ onBrandToggle, removeFilterBrand, brandFilter }) {
    const handleCheckboxChange = (id, value) => {
        onBrandToggle(id, value);
    };

    const handleDeleteFilter = () => {
        removeFilterBrand();
        const checkboxes = document.querySelectorAll('.checkbox-filter-item');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };

    return (
        <div className="brands-filter">
            <div className="brands-filter-top d-flex justify-content-between">
                <div className="brand-icon">
                    <SellOutlinedIcon style={{ marginLeft: "5px" }} />
                    برند ها
                </div>
                <div className='delete-filter-brand' onClick={handleDeleteFilter}>حذف فیلتر</div>
            </div>
            {
                brandFilter &&
                brandFilter.map(brand => (
                    <div className='checkbox-filter-item-wrapper' key={brand.id}>
                        <input
                            id={brand.id}
                            type="checkbox"
                            className='checkbox-filter-item'
                            value={brand.id}
                            onChange={() => handleCheckboxChange(brand.id)}
                        />
                        <label htmlFor={brand.id} className='brand-item'>{brand.brand_name}</label>
                    </div>
                ))
            }
        </div>
    );
}
