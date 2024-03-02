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

    const regexPhone = /^(\+?\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
    const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    const regexPostalCode = /^\d{ 10}$/

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
    }

    const register = (e) => {
        e.preventDefault()
        if (!name || !lastName || !postalCode || !phone || !password || !confirmPass || !address || !email) {
            alert("لطفا تمامی فیلدها را پر کنید");
            return;
        }

        if (!regexPhone.test(phone) || !regexEmail.test(email) || !regexPostalCode.test(postalCode)) {
            alert("لطفا اطلاعات صحیح را وارد کنید");
            return;
        }

        if (password !== confirmPass) {
            alert("رمزها مطابقت ندارند");
            return;
        }

        const body = {

        }

        try {
            const response = axios.post(`${IP}`, body)
            if (response.status === 201) {
                console.log(response.data)
                closeHandler()
            }

        } catch (error) {
            console.log(error.message)
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
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="last-name" className='lable-input'>نام خانوادگی</label>
                                <input
                                    type="text"
                                    id='last-name'
                                    className='input-form'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="postal-code" className='lable-input'>کد پستی</label>
                                <input
                                    type="text"
                                    id='postal-code'
                                    className='input-form'
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
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
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="password" className='lable-input'>رمز</label>
                                <input
                                    type="text"
                                    id='password'
                                    className='input-form'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
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
                            </div>
                        </div>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="location" className='lable-input mt-3' >آدرس</label>
                            <input
                                type="text"
                                id='location'
                                className='input-form'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
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
