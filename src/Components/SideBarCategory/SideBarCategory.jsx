import React from 'react'
import './SideBarCategory.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { NavLink } from 'react-router-dom';
export default function SideBarCategory({ showSideBar, hideSideBarMenu, sideBarCategory }) {
    return (
        <>
            <div className={`category-sidebar-wrapper ${showSideBar ? "category-sidebar-wrapper-active" : ""}`}>
                <div className="ctegory-sidbar-top">
                    <h3>Logo</h3>
                    <CloseOutlinedIcon onClick={hideSideBarMenu} />
                </div>
                <ul className="category-sidebar-list">
                    {
                        sideBarCategory &&
                            sideBarCategory ? (
                            sideBarCategory.map((categorie, i) => (
                                <div>
                                    <NavLink to={`/category-info/${categorie.name}`} className="category-sidebar-item">
                                        {categorie.name}
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
