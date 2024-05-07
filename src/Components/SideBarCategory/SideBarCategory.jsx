import React, { useContext } from 'react'
import './SideBarCategory.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import { IP } from '../../App';
export default function SideBarCategory({ showSideBar, hideSideBarMenu, sideBarCategory }) {
    const authContext = useContext(AuthContext)
    return (
        <>
            <div className={`category-sidebar-wrapper ${showSideBar ? "category-sidebar-wrapper-active" : ""}`}>
                <div className="ctegory-sidbar-top">
                    <Link to={"/"}>
                        <img className='logo-header' src={`${IP}${authContext?.informationCo[0]?.logo}`} alt="" />
                    </Link>
                    <CloseOutlinedIcon onClick={hideSideBarMenu} />
                </div>
                <ul className="category-sidebar-list">
                    {
                        sideBarCategory &&
                            sideBarCategory ? (
                            sideBarCategory.map((categorie, i) => (
                                <div className='sidebaer-item'>
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
