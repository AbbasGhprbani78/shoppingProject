import React, { useState, useEffect } from 'react'
import './SignInForm.css'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
export default function SignInForm({ showLoginForm, closeSignInForm }) {
    const [isPrivate, setIsPerivate] = useState(true);

    const handleToggle = () => {
        setIsPerivate((e) => !e);
    }

    return (
        <>
            <div className={`signIn-form-container ${showLoginForm ? "signIn-form-container-active" : ""}`}>
                <div className="signIn-form-wrapper">
                    <div className="signIn-form-header d-flex justify-content-between align-items-center">
                        ورود<CloseOutlinedIcon style={{ cursor: "pointer" }} onClick={closeSignInForm} />

                    </div>
                    <p className="signIn-form-title">مشخصات خود را وارد کنید </p>
                    <form className='signIn-form'>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="phone" className='lable-input'>موبایل</label>
                            <input type="text" id='phone' className='input-form' />
                        </div>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="password" className='lable-input'>رمز</label>
                            <div className="input-eye-wrapper">
                                {isPrivate ? (
                                    <VisibilityOutlinedIcon
                                        className="setin"
                                        onClick={handleToggle}
                                    />
                                ) : (
                                    <VisibilityOffOutlinedIcon
                                        className="setin"
                                        onClick={handleToggle}
                                    />
                                )}
                                <input type={isPrivate ? "password" : "text"}
                                    id="password"
                                    className='input-form input-password' />
                            </div>
                        </div>
                        <div className='mt-3 text-center'><button className='signIn-btn'>ورود</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}
