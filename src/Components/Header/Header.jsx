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

export default function Header() {

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
        setShowChangeForm(true);
        setShowOptions(false);

        const access = localStorage.getItem('user');
        const headers = {
            Authorization: `Bearer ${access}`
        };


        try {
            const response = await axios.get(`${IP}/user/get-user`, {
                headers,
            });

            if (response.status === 200) {
                console.log(response.data);
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
                    query: searchValue.toLowerCase()
                }
            });
            if (response.status === 200) {
                updateSearchResults(response.data.products)
                console.log(response.data)
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
                                                        sideBarCategory={sideBarCategory}

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
                                                                        <li style={{ borderBottom: "none" }} className='register-item'>سفارشات<CheckCircleOutlineIcon style={{ color: "#031a3d" }} /></li>
                                                                        <li className='register-item'>علاقه مندی ها<FavoriteBorderIcon style={{ color: "#031a3d" }} /></li>
                                                                        <li className="register-item" onClick={showInfoUser} >ویرایش حساب<ModeEditOutlineIcon style={{ color: "#031a3d" }} /></li>
                                                                        <li className='register-item' onClick={showwarningLogout}>خروج<LogoutIcon style={{ color: "#031a3d" }} /></li>
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
                                    <input
                                        value={searchValue}
                                        className='searchinput'
                                        type="search"
                                        placeholder='جستجو'
                                        onChange={e => setSearchValue(e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                    <SearchOutlinedIcon className='searchicon-header' />
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
                                                                        <li style={{ borderBottom: "none" }} className='register-item'>سفارشات<CheckCircleOutlineIcon style={{ color: "#031a3d" }} /></li>
                                                                        <li className='register-item'>علاقه مندی ها<FavoriteBorderIcon style={{ color: "#031a3d" }} /></li>
                                                                        <li className="register-item" onClick={showInfoUser} >ویرایش حساب<ModeEditOutlineIcon style={{ color: "#031a3d" }} /></li>
                                                                        <li className='register-item' onClick={showwarningLogout}>خروج<LogoutIcon style={{ color: "#031a3d" }} /></li>
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
                                            <input
                                                value={searchValue}
                                                className='searchinput'
                                                type="search"
                                                placeholder='جستجو'
                                                onChange={e => setSearchValue(e.target.value)}
                                            />
                                            <SearchOutlinedIcon className='searchicon-header' />
                                            {
                                                searchValue && searchResults && searchResults.length === 0 &&
                                                <div className="result-search">
                                                    نتیجه ای یافت نشد
                                                </div>
                                            }

                                        </div>
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
                            </div>
                        </>
                    )
            }

        </>

    )
}
