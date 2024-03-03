import React, { useState, useRef, useEffect } from 'react'
import './RegisterForm.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IP } from '../../App';
import axios from 'axios';
export default function RegisterForm({ showRegisterForm, closeRegisterForm }) {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("");
    const [formSubmitt, setFormSubmitt] = useState(false)

    const regexPhone = /^(\+?\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
    const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    const regexPostalCode = /^\d{5}_\d{4}$/;


    const closeHandler = () => {
        closeRegisterForm()
        setName("")
        setLastName("")
        setPostalCode("")
        setPhone("")
        setPassword("")
        setConfirmPass("")
        setAddress("")
        setEmail("")
        setFormSubmitt(false)
    }

    const register = async (e) => {

        e.preventDefault()
        setFormSubmitt(true)
        if (!name || !lastName || !postalCode || !phone || !password || !confirmPass || !address || !email ||
            !regexPhone.test(phone) || !regexEmail.test(email) || !regexPostalCode.test(postalCode) || password !== confirmPass) {
            return;
        }

        const body = {
            first_name: name,
            last_name: lastName,
            postal_code: postalCode,
            phone,
            password,
            confirm_password: confirmPass,
            address,
            email,
        }

        const newBody = JSON.stringify(body)
        console.log(newBody)

        try {
            const response = await axios.post(`${IP}/user/signup/`, body)
            if (response.status === 201) {
                closeHandler()
            }

        } catch (error) {
            console.log(`${error.response.data.message}`)
        }
    }


    return (
        <>
            <div className={`register-form-container ${showRegisterForm ? "register-form-container-active" : ""}`}>
                <div className="register-form-wrapper">
                    <div className="register-form-header d-flex justify-content-between align-items-center">ثبت نام<CloseOutlinedIcon style={{ cursor: "pointer" }}
                        onClick={closeHandler} />
                    </div>
                    <p className="register-form-title">مشخصات خود را وارد کنید </p>
                    <form className='register-form'>
                        <div className="register-form-gird">
                            <div className="signIn-input-wrapper">
                                <label htmlFor="name" className='lable-input'>نام</label>
                                <input
                                    type="text"
                                    id='name'
                                    className='input-form'
                                    value={name}
                                    onChange={(e) => setName(e.target.value.trimStart())}
                                />
                                {name === "" && formSubmitt && <p className='error-input'>نام را وارد کنید</p>}
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="last-name" className='lable-input'>نام خانوادگی</label>
                                <input
                                    type="text"
                                    id='last-name'
                                    className='input-form'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value.trimStart())}
                                />
                                {lastName === "" && formSubmitt && <p className='error-input'>نام خانوادگی را وارد کنید</p>}
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="postal-code" className='lable-input'>کد پستی</label>
                                <input
                                    type="text"
                                    id='postal-code'
                                    className='input-form'
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    style={{ textAlign: "right" }}
                                    dir='ltr'
                                />
                                {!regexPostalCode.test(postalCode) && formSubmitt && <p className='error-input'>کد پستی معتبر نیست</p>}
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="phone" className='lable-input'>موبایل</label>
                                <input
                                    type="text"
                                    id='phone'
                                    className='input-form'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {!regexPhone.test(phone) && formSubmitt && <p className='error-input'>شماره تماس معتبر نیست</p>}
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="password" className='lable-input'>رمز</label>
                                <input
                                    type="text"
                                    id='password'
                                    className='input-form'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value.trimStart())}
                                />
                                {password === "" && formSubmitt && <p className='error-input'>رمز خود را وارد کنید</p>}
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="confirm-pass" className='lable-input'>تایید رمز</label>
                                <input
                                    type="text"
                                    id='confirm-pass'
                                    className='input-form'
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    onPaste={(e) => e.preventDefault()}
                                />
                                {confirmPass === "" && formSubmitt || confirmPass !== password && <p className='error-input'>رمز خود را تایید کنید</p>}
                            </div>
                        </div>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="location" className='lable-input mt-3' >آدرس</label>
                            <input
                                type="text"
                                id='location'
                                className='input-form'
                                value={address}
                                onChange={(e) => setAddress(e.target.value.trimStart())}
                            />
                            {address === "" && formSubmitt && <p className='error-input'>نشانی خود را وارد کنید</p>}
                        </div>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="email" className='lable-input mt-3'>ایمیل</label>
                            <input
                                type="text"
                                id='email'
                                className='input-form'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {!regexEmail.test(email) && formSubmitt && <p className='error-input'>ایمیل معتبر نیست</p>}
                        </div>
                        <div
                            className='mt-3 text-center'>
                            <button className='signIn-btn' onClick={(e) => register(e)}>ثبت نام</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

