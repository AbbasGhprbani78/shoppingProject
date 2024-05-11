import React, { useState, useEffect, useRef, useContext } from 'react'
import './Header.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, NavLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import SignInForm from '../SignInForm/SignInForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import SideBarCategory from '../SideBarCategory/SideBarCategory';
import { IP } from '../../App'
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AuthContext from '../../Context/AuthContext';
import EditInfo from '../EditInfo/EditInfo';
import swal from 'sweetalert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';;
import { useSearchContext } from '../../Context/SearchContext';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

export default function Header({ informationCo }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showOptions, setShowOptions] = useState(false);
    const subUserRef = useRef(null);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false)
    const [showChangeForm, setShowChangeForm] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    const [infoUser, setInfoUser] = useState(null)
    const authContext = useContext(AuthContext)
    const [sideBarCategory, setSideBarCategory] = useState(null);
    const [searchValue, setSearchValue] = useState()
    const { updateSearchResults } = useSearchContext();
    const { searchResults } = useSearchContext();
    const [isFixed, setIsFixed] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 0) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        updateSearchResults(null)
    }, [])

    useEffect(() => {
        setSideBarCategory(authContext.data && authContext.data.categories)
    }, [authContext.data])

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

    const closeChangeForm = () => {
        setShowChangeForm(false)
    }

    const showInfoUser = async () => {
        setShowOptions(false);
        setShowChangeForm(true);

        const access = localStorage.getItem('user');
        const headers = {
            Authorization: `Bearer ${access}`
        };


        try {
            const response = await axios.get(`${IP}/user/get-user`, {
                headers,
            });

            if (response.status === 200) {
                console.log(response.data)
                setInfoUser(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized access. Please check your credentials.");
            } else {
                console.log("Error:", error.message);
            }
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
                authContext.logout()
                swal({
                    title: "با موفقیت خارج شدید",
                    icon: "success",
                    button: "باشه"
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const showwarningLogout = () => {
        swal({
            title: "از حساب کاربری خارج می‌شوید؟",
            icon: "warning",
            buttons: ["انصراف", "خروج از حساب"]
        }).then(result => {
            if (result) {
                logoutHandler()
            }
        })

    }

    const searchProduct = async () => {
        try {
            const response = await axios.get(`${IP}/product/search/`, {
                params: {
                    query: searchValue
                }
            });
            if (response.status === 200) {
                updateSearchResults(response.data.products)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        searchProduct()
        if (searchValue === "") {
            updateSearchResults(null)
        }
    }, [searchValue])


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
            <>
                <EditInfo
                    showChangeForm={showChangeForm}
                    closeChangeForm={closeChangeForm}
                    infoUser={infoUser}
                />
            </>
            {
                windowWidth < 992 ?
                    (
                        <>
                            <div className={`header-container ${isFixed ? 'fixed' : ''}`}>
                                <div className="header-wrapper">
                                    <div style={{ border: "none" }} className='div-border'>
                                        <div className="header-top">
                                            <div className='d-flex align-items-center'>
                                                <div style={{ cursor: "pointer" }} className='d-lg-none'>
                                                    <MoreVertIcon className='moreVertIcon' onClick={showSideBarMenu} />
                                                    <SideBarCategory
                                                        showSideBar={showSideBar}
                                                        hideSideBarMenu={hideSideBarMenu}
                                                        sideBarCategory={sideBarCategory}
                                                        informationCo={informationCo}
                                                    />
                                                </div>
                                            </div>
                                            <p className='phone-user'>{informationCo[0]?.phone}</p>
                                            <div className="header-info">
                                                <div className="phone-user-container">
                                                    <LocalPhoneIcon />
                                                </div>
                                                <Link to={"#"} className="user user1">
                                                    <PersonOutlineIcon className='person-header' onClick={showoptionsHandler} />
                                                    <div ref={subUserRef} className={`sub-user-wrapper ${showOptions ? "activefilterbox" : ""}`}>
                                                        <div className="register-wrapper">
                                                            {
                                                                authContext.token ? (
                                                                    <>
                                                                        {/* <li
                                                                            style={{ borderBottom: "none" }}
                                                                            className='register-item'>سفارشات<CheckCircleOutlineIcon style={{ color: "#031a3d" }} />
                                                                        </li> */}
                                                                        {/* <li
                                                                            className='register-item'>علاقه مندی ها<FavoriteBorderIcon
                                                                                style={{ color: "#031a3d" }} />
                                                                        </li> */}

                                                                        <li
                                                                            className="register-item"
                                                                            onClick={showInfoUser} >ویرایش حساب<ModeEditOutlineIcon
                                                                                style={{ color: "#031a3d" }} />
                                                                        </li>
                                                                        <li
                                                                            className='register-item'
                                                                            onClick={showwarningLogout}>خروج<LogoutIcon
                                                                                style={{ color: "#031a3d" }} />
                                                                        </li>
                                                                        {/* <Link
                                                                            to={'/purchasehistory'}
                                                                            style={{ all: "unset" }}><li
                                                                                className='register-item'>سوابق خرید<HistoryOutlinedIcon style={{ color: "#031a3d" }} />

                                                                            </li>
                                                                        </Link> */}
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
                                                <Link to={"/basket"} className="user basket">
                                                    <ShoppingBasketOutlinedIcon className='person-header' />
                                                    {
                                                        authContext && authContext.productNumber ?
                                                            <div div className='number-purchase'>{authContext.productNumber}</div>
                                                            : null
                                                    }
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
                                        value={searchValue}
                                        className='searchinput'
                                        type="search"
                                        placeholder='جستجو'
                                        onChange={e => setSearchValue(e.target.value)}
                                        style={{ width: "100%" }}
                                    />

                                    {
                                        searchValue && searchResults && searchResults.length === 0 &&
                                        <div className="result-search">
                                            نتیجه ای یافت نشد
                                        </div>
                                    }
                                </div>
                            </div>
                        </>) :
                    (
                        <>
                            <div className={`header-container ${isFixed ? 'fixed' : ''}`}>
                                <div className="header-wrapper">
                                    <div className='div-border'>
                                        <div className="header-top">
                                            <div
                                                style={{ cursor: "pointer" }}
                                                className='d-lg-none'>
                                                <MoreVertIcon />
                                            </div>
                                            <Link to={"/"} className="header-logo">
                                                <img className='logo-header' src={`${IP}${informationCo[0]?.logo}`} alt="" />
                                            </Link>
                                            <div className="header-info">
                                                <div className="phone-user-container">
                                                    <p className='phone-user'>{informationCo[0]?.phone} </p>
                                                    <LocalPhoneIcon />
                                                </div>
                                                <Link to={"#"} className="user" onClick={showoptionsHandler}>
                                                    <PersonOutlineIcon className='person-header' />
                                                    <div ref={subUserRef} className={`sub-user-wrapper ${showOptions ? "activefilterbox" : ""}`}>
                                                        <div className="register-wrapper">
                                                            {
                                                                authContext.token ? (
                                                                    <>
                                                                        {/* <li
                                                                            style={{ borderBottom: "none" }}
                                                                            className='register-item'>سفارشات<CheckCircleOutlineIcon
                                                                                style={{ color: "#031a3d" }} />
                                                                        </li> */}
                                                                        {/* <li
                                                                            className='register-item'>علاقه مندی ها<FavoriteBorderIcon
                                                                                style={{ color: "#031a3d" }} />
                                                                        </li> */}
                                                                        <li
                                                                            className="register-item"
                                                                            onClick={showInfoUser} >ویرایش حساب<ModeEditOutlineIcon
                                                                                style={{ color: "#031a3d" }} />
                                                                        </li>
                                                                        <li
                                                                            className='register-item'
                                                                            onClick={showwarningLogout}>خروج<LogoutIcon
                                                                                style={{ color: "#031a3d" }} />
                                                                        </li>
                                                                        {/* <Link
                                                                            to={'/purchasehistory'}
                                                                            style={{ all: "unset" }}><li className='register-item'>سوابق خرید<HistoryOutlinedIcon
                                                                                style={{ color: "#031a3d" }} />
                                                                            </li>
                                                                        </Link> */}
                                                                    </>) :

                                                                    (
                                                                        <>
                                                                            <li onClick={loginHandler} className='register-item'>ورود<LoginIcon
                                                                                style={{ color: "#031a3d" }} />
                                                                            </li>
                                                                            <li onClick={registerHandler} className='register-item'>ثبت نام</li>
                                                                        </>)
                                                            }
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={"/basket"} className="user">
                                                    <ShoppingBasketOutlinedIcon className='person-header' />
                                                    {
                                                        authContext && authContext.productNumber ?
                                                            <div div className='number-purchase'>{authContext.productNumber}</div>
                                                            : null
                                                    }
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="header-buttom">
                                        <div className='d-flex align-items-center'>
                                            <div className='searchinput-wrapper'>
                                                <SearchOutlinedIcon className='searchicon-header' />
                                                <input
                                                    value={searchValue}
                                                    className='searchinput'
                                                    type="search"
                                                    placeholder='جستجو'
                                                    onChange={e => setSearchValue(e.target.value)}
                                                />

                                                {
                                                    searchValue && searchResults && searchResults.length === 0 &&
                                                    <div className="result-search">
                                                        نتیجه ای یافت نشد
                                                    </div>
                                                }

                                            </div>
                                            <div className="categorys-wrapper">
                                                <NavLink className='category-item' to={"/blogs/1"}>وبلاگ</NavLink>
                                            </div>                                        </div>
                                        <div className='categorys-wrapper d-flex'>
                                            {
                                                authContext.data &&
                                                    authContext.data.categories ? (
                                                    authContext.data.categories.map((categorie, i) => (
                                                        <div
                                                            key={i}>
                                                            <NavLink
                                                                to={`/category-info/${categorie.name}`}
                                                                className='category-item'
                                                            >{categorie.name}
                                                            </NavLink>
                                                        </div>
                                                    )))
                                                    : (null)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </>
                    )
            }

        </>

    )
}
