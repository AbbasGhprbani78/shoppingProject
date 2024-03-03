import React, { useState, useEffect, useRef, useContext } from 'react'
import './Header.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import SignInForm from '../SignInForm/SignInForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import SideBarCategory from '../SideBarCategory/SideBarCategory';
import { IP } from '../../App'
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AuthContext from '../../Context/AuthContext';
export default function Header() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showOptions, setShowOptions] = useState(false);
    const subUserRef = useRef(null);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    const [allProductsHome, setAllProductsHome] = useState([])
    const authContext = useContext(AuthContext)

    useEffect(() => {

        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (subUserRef.current && !subUserRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const showoptionsHandler = () => {
        setShowOptions(prevState => !prevState)
    }

    const loginHandler = () => {
        setShowOptions(false)
        setShowLoginForm(true)
    }

    const registerHandler = () => {
        setShowOptions(false)
        setShowRegisterForm(true)
    }

    const closeSignInForm = () => {
        setShowLoginForm(false)
    }

    const closeRegisterForm = () => {
        setShowRegisterForm(false)
    }

    const showSideBarMenu = () => {
        setShowSideBar(true)
    }

    const hideSideBarMenu = () => {
        setShowSideBar(false)
    }

    const changeInfo = async () => {

        const body = {

        }
        try {
            const response = await axios.put(`${IP}/user/edit-profile/`, body)
            if (response.status === 200) {
                console.log(response)
                setShowOptions(false)
            }

        } catch (error) {
            console.log(error.message)
        }
    }


    const getProductsHome = async () => {
        try {

            const response = await axios.get(`${IP}/product/home/`)
            if (response.status === 200) {
                console.log(response.data)
                setAllProductsHome(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const logoutHandler = async () => {

        const access = localStorage.getItem('user')
        const refresh = localStorage.getItem('refresh')

        const headers = {
            Authorization: `Bearer ${access}`,

        };
        const body = {
            refresh: refresh
        }
        try {
            const response = await axios.post(`${IP}/user/logout/`, body, {
                headers
            })

            if (response.status === 200) {
                setShowOptions(false)
                console.log(response)
                authContext.logout()
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProductsHome()
    }, [])


    return (
        <>
            <>
                <SignInForm
                    showLoginForm={showLoginForm}
                    closeSignInForm={closeSignInForm}
                />
            </>
            <>
                <RegisterForm
                    showRegisterForm={showRegisterForm}
                    closeRegisterForm={closeRegisterForm}
                />
            </>
            {
                windowWidth < 992 ?
                    (
                        <>
                            <div className='header-container'>
                                <div className="header-wrapper">
                                    <div style={{ border: "none" }} className='div-border'>
                                        <div className="header-top">
                                            <div className='d-flex'>
                                                <div style={{ cursor: "pointer" }} className='d-lg-none'>
                                                    <MoreVertIcon onClick={showSideBarMenu} />
                                                    <SideBarCategory
                                                        showSideBar={showSideBar}
                                                        hideSideBarMenu={hideSideBarMenu}
                                                        allProductsHome={allProductsHome}

                                                    />
                                                </div>
                                                <div className="header-logo">Logo</div>
                                            </div>
                                            <div className="header-info">
                                                <div className="phone-user-container">
                                                    <p className='phone-user'>0916 295 7253 </p>
                                                    <LocalPhoneIcon />
                                                </div>
                                                <Link to={"#"} className="user">
                                                    <PersonOutlineIcon className='person-header' onClick={showoptionsHandler} />
                                                    <div ref={subUserRef} className={`sub-user-wrapper ${showOptions ? "activefilterbox" : ""}`}>
                                                        <div className="register-wrapper">
                                                            {
                                                                authContext.token ? (
                                                                    <>
                                                                        <li className='register-item'>سفارشات</li>
                                                                        <li className='register-item'>علاقه مندی ها</li>
                                                                        <li className="register-item" onClick={changeInfo} >ویرایش حساب<ModeEditOutlineIcon /></li>
                                                                        <li className='register-item' onClick={logoutHandler}>خروج<LogoutIcon style={{ color: "#031a3d" }} /></li>
                                                                    </>) :

                                                                    (
                                                                        <>
                                                                            <li onClick={loginHandler} className='register-item'>ورود<LoginIcon style={{ color: "#031a3d" }} /></li>
                                                                            <li onClick={registerHandler} className='register-item'>ثبت نام</li>
                                                                        </>)
                                                            }

                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={"/basket"} className="card-wrapper">
                                                    <svg className='card-header bi bi-basket2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
                                                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" />
                                                    </svg>
                                                    <div className='number-purchase'>1</div>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="header-buttom header-small">
                                <div style={{ width: "100%", border: "none", padding: "0 10px" }} className='searchinput-wrapper'>
                                    <SearchOutlinedIcon className='searchicon-header' />
                                    <input
                                        style={{ width: "100%" }}
                                        className='searchinput'
                                        type="text"
                                        placeholder='جستجو'
                                    />
                                </div>
                            </div>
                        </>) :
                    (
                        <>
                            <div className='header-container'>
                                <div className="header-wrapper">
                                    <div className='div-border'>
                                        <div className="header-top">
                                            <div
                                                style={{ cursor: "pointer" }}
                                                className='d-lg-none'>
                                                <MoreVertIcon />
                                            </div>
                                            <div className="header-logo">Logo</div>
                                            <div className="header-info">
                                                <div className="phone-user-container">
                                                    <p className='phone-user'>0916 295 7253 </p>
                                                    <LocalPhoneIcon />
                                                </div>
                                                <Link to={"#"} className="user">
                                                    <PersonOutlineIcon className='person-header' onClick={showoptionsHandler} />
                                                    <div ref={subUserRef} className={`sub-user-wrapper ${showOptions ? "activefilterbox" : ""}`}>
                                                        <div className="register-wrapper">
                                                            {
                                                                authContext.token ? (
                                                                    <>
                                                                        <li style={{ borderBottom: "none" }} className='register-item'>سفارشات</li>
                                                                        <li className='register-item'>علاقه مندی ها</li>
                                                                        <li className="register-item" onClick={changeInfo} >ویرایش حساب<ModeEditOutlineIcon /></li>
                                                                        <li className='register-item' onClick={logoutHandler}>خروج<LogoutIcon style={{ color: "#031a3d" }} /></li>
                                                                    </>) :

                                                                    (
                                                                        <>
                                                                            <li onClick={loginHandler} className='register-item'>ورود<LoginIcon style={{ color: "#031a3d" }} /></li>
                                                                            <li onClick={registerHandler} className='register-item'>ثبت نام</li>
                                                                        </>)
                                                            }
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={"/basket"} className="card-wrapper">
                                                    <svg className='card-header bi bi-basket2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
                                                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" />
                                                    </svg>
                                                    <div className='number-purchase'>1</div>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="header-buttom">
                                        <div className='searchinput-wrapper'>
                                            <SearchOutlinedIcon className='searchicon-header' />
                                            <input
                                                className='searchinput'
                                                type="text"
                                                placeholder='جستجو'
                                            />
                                        </div>
                                        <div className='categorys-wrapper d-flex'>
                                            {
                                                allProductsHome &&
                                                    allProductsHome.categories ? (
                                                    allProductsHome.categories.map((categorie, i) => (
                                                        <div>
                                                            <Link to={`/category-info/${categorie.name}/${categorie.category_id}/1`} className='category-item'>{categorie.name}</Link>
                                                        </div>
                                                    )))
                                                    : (null)

                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }

        </>

    )
}
