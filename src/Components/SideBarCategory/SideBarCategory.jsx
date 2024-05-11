import React from 'react'
import './SideBarCategory.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link, NavLink } from 'react-router-dom';
import { IP } from '../../App';
export default function SideBarCategory({ showSideBar, hideSideBarMenu, sideBarCategory, informationCo }) {
    return (
        <>
            <div className={`category-sidebar-wrapper ${showSideBar ? "category-sidebar-wrapper-active" : ""}`}>
                <div className="ctegory-sidbar-top">
                    <Link to={"/"} onClick={hideSideBarMenu}>
                        <img className='logo-header' src={`${IP}${informationCo[0]?.logo}`} alt="" />
                    </Link>
                    <CloseOutlinedIcon onClick={hideSideBarMenu} />
                </div>
                <ul className="category-sidebar-list">
                    {
                        sideBarCategory &&
                            sideBarCategory ? (
                            sideBarCategory.map((categorie, i) => (
                                <div className='sidebaer-item' style={{ marginRight: "10px" }} onClick={hideSideBarMenu}>
                                    <NavLink to={`/category-info/${categorie.name}`} className="category-sidebar-item">
                                        {categorie.name}
                                    </NavLink>
                                </div>
                            )))
                            : (null)
                    }
                </ul>
                <div className='weblog-sideBar-container'>
                    <NavLink className="weblog-sideBar" to={'/blogs/1'} onClick={hideSideBarMenu}>وبلاگ</NavLink>
                </div>
            </div >
        </>
    )
}
