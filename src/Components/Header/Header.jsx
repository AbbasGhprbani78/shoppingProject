import React from 'react'
import './Header.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <>
            <div className='header-container'>
                <div className="header-wrapper">
                    <div className='div-border'>
                        <div className="header-top">
                            <div className="header-logo">Logo</div>
                            <div className="header-info">
                                <div className="phone-user-container">
                                    <p className='phone-user'>0916 295 7253 </p>
                                    <LocalPhoneIcon />
                                </div>
                                <Link to={"#"} className="user">
                                    <PersonOutlineIcon className='person-header' />
                                </Link>
                                <Link to={"#"} className="card-wrapper">
                                    <svg className='card-header bi bi-basket2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
                                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" />
                                    </svg>
                                    {/* <ShoppingBagOutlinedIcon className='' /> */}
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
                    </div>
                </div>
            </div>
        </>

    )
}
