import React from 'react'
import './SideBarCategory.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { NavLink } from 'react-router-dom';
export default function SideBarCategory({ showSideBar, hideSideBarMenu }) {

    return (
        <>
            <div className={`category-sidebar-wrapper ${showSideBar ? "category-sidebar-wrapper-active" : ""}`}>
                <div className="ctegory-sidbar-top">
                    <h3>Logo</h3>
                    <CloseOutlinedIcon onClick={hideSideBarMenu} />
                </div>
                <ul className="category-sidebar-list">
                    <NavLink to={"/category-info/tail/1"} className="category-sidebar-item">
                        کاشی
                    </NavLink>
                    <NavLink to={"/category-info/tail/1"} className="category-sidebar-item">
                        کاشی
                    </NavLink>

                    <NavLink to={"/category-info/tail/1"} className="category-sidebar-item">
                        کاشی
                    </NavLink>
                </ul>
            </div >
        </>
    )
}
