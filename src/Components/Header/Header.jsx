import React from 'react'
import './Header.css'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <>
            <div className='header-container'>
                <div className="header-wrapper">
                    <div className="header-top">
                        <div className="header-logo">Logo</div>
                        <div className="header-info">
                            <div className="phone-user-container">
                                <p className='phone-user'>0916 295 7253</p>
                                <LocalPhoneIcon />
                            </div>
                            <Link to={"#"} className="user">
                                <PersonOutlineIcon className='person-header' />
                            </Link>
                            <Link to={"#"} className="card-wrapper">
                                <ShoppingBagOutlinedIcon className='card-header' />
                                <div className='number-purchase'>1</div>
                            </Link>
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
