import React from 'react'
import './SideBarCategory.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { NavLink } from 'react-router-dom';
export default function SideBarCategory({ showSideBar, hideSideBarMenu, allProductsHome }) {

    return (
        <>
            <div className={`category-sidebar-wrapper ${showSideBar ? "category-sidebar-wrapper-active" : ""}`}>
                <div className="ctegory-sidbar-top">
                    <h3>Logo</h3>
                    <CloseOutlinedIcon onClick={hideSideBarMenu} />
                </div>
                <ul className="category-sidebar-list">
                    {
                        allProductsHome &&
                            allProductsHome.categories ? (
                            allProductsHome.categories.map((categorie, i) => (
                                <div>
                                    <NavLink to={`/category-info/${categorie.name}/${categorie.category_id}/1`} className="category-sidebar-item">
                                        کاشی
                                    </NavLink>
                                </div>
                            )))
                            : (null)
                    }
                </ul>
            </div >
        </>
    )
}
