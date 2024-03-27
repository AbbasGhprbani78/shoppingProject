import React, { useState } from 'react'
import './ShowAbout.css'
import RegisterForm from '../RegisterForm/RegisterForm'
import SignInForm from '../SignInForm/SignInForm'
export default function ShowAbout() {

    const [showRegisterForm, setShowRegisterForm] = useState(false)
    const [showOptions, setShowOptions] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isRegister, setIsRegister] = useState(false)

    const closeRegisterForm = () => {
        setShowRegisterForm(false)
    }

    const registerHandler = () => {
        setShowOptions(false)
        setShowRegisterForm(true)
    }

    const loginHandler = () => {
        setShowOptions(false)
        setShowLoginForm(true)
    }

    const closeSignInForm = () => {
        setShowLoginForm(false)
    }

    return (
        <>
            <>
                <RegisterForm
                    showRegisterForm={showRegisterForm}
                    closeRegisterForm={closeRegisterForm}
                    setIsRegister={setIsRegister}
                />
            </>
            <>
                <SignInForm
                    showLoginForm={showLoginForm}
                    closeSignInForm={closeSignInForm}
                />
            </>
            <div className='show-about'>
                <div className="show-about-contect">
                    <p className='show-about-text'>لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به </p>
                    <button className={`link-btn show-about-register ${isRegister ? "enterclass" : ""}`} onClick={isRegister ? loginHandler : registerHandler}>
                        {
                            isRegister ? "ورود" : "ثبت نام کنید"
                        }
                    </button>
                    {

                        !isRegister &&
                        <span className='mt-3' style={{ fontSize: ".8rem" }}>حساب کاربری دارید؟
                            <span style={{ color: "#523f81", fontWeight: "bold", marginRight: "5px", cursor: "pointer", fontSize: ".9rem" }} onClick={loginHandler}>ورود</span>
                        </span>
                    }

                </div>
            </div>
        </>

    )
}
