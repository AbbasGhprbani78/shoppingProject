import React from 'react'
import './RegisterForm.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
export default function RegisterForm({ showRegisterForm, closeRegisterForm }) {
    return (
        <>
            <div className={`register-form-container ${showRegisterForm ? "register-form-container-active" : ""}`}>
                <div className="register-form-wrapper">
                    <div className="register-form-header d-flex justify-content-between align-items-center">ثبت نام<CloseOutlinedIcon style={{ cursor: "pointer" }} onClick={closeRegisterForm} />
                    </div>
                    <p className="register-form-title">مشخصات خود را وارد کنید </p>
                    <form className='register-form'>
                        <div className="register-form-gird">
                            <div className="signIn-input-wrapper">
                                <label htmlFor="phone" className='lable-input'>نام</label>
                                <input type="text" id='phone' className='input-form' />
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="phone" className='lable-input'>نام خانوادگی</label>
                                <input type="text" id='phone' className='input-form' />
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="phone" className='lable-input'>کد پستی</label>
                                <input type="text" id='phone' className='input-form' />
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="phone" className='lable-input'>موبایل</label>
                                <input type="text" id='phone' className='input-form' />
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="phone" className='lable-input'>رمز</label>
                                <input type="text" id='phone' className='input-form' />
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="phone" className='lable-input'>تایید رمز</label>
                                <input type="text" id='phone' className='input-form' />
                            </div>
                        </div>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="phone" className='lable-input mt-3' >آدرس</label>
                            <input type="text" id='phone' className='input-form' />
                        </div>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="phone" className='lable-input mt-3'>ایمیل</label>
                            <input type="text" id='phone' className='input-form' />
                        </div>
                        <div className='mt-3 text-center'><button className='signIn-btn'>ثبت نام</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}
