import React, { useState, useEffect } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './EditInfo.css';
import axios from 'axios';
import { IP } from '../../App'
import swal from 'sweetalert';
export default function EditInfo({ showChangeForm, closeChangeForm, userInfo }) {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("");
    const [formSubmitt, setFormSubmitt] = useState(false)
    const [showPasswordInputs, setShowPasswordInputs] = useState(false)

    const regexPhone = /^(\+?\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
    const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    const regexPostalCode = /^\d{5}_\d{4}$/;

    const closeHandler = () => {
        closeChangeForm()
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

    const changeInfo = async (e) => {

        e.preventDefault()
        setFormSubmitt(true)

        if (showPasswordInputs) {

            if (!password || !confirmPass || password !== confirmPass) {
                return;
            }
        }
        if (!name || !lastName || !postalCode || !phone || !address || !email ||
            !regexPhone.test(phone) || !regexEmail.test(email) || !regexPostalCode.test(postalCode)) {
        }

        const formData = new FormData();
        formData.append("first_name", name)
        formData.append("last_name", lastName)
        formData.append("postal_code", postalCode)
        formData.append("phone", phone)
        formData.append("address", address)
        formData.append("email", email)

        if (showPasswordInputs) {
            formData.append("password", password)
            formData.append(" confirm_password", confirmPass)
        }

        try {
            const response = await axios.put(`${IP}/`, formData)
            if (response.status === 200) {
                closeHandler()
            }

        } catch (error) {
            console.log(`${error.message}`)
        }
    }


    return (
        <>
            <div className={`register-form-container ${showChangeForm ? "register-form-container-active" : ""}`}>
                <div className="register-form-wrapper">
                    <div className="register-form-header d-flex justify-content-between align-items-center">ثبت نام<CloseOutlinedIcon style={{ cursor: "pointer" }}
                        onClick={closeHandler} />
                    </div>
                    <p className="register-form-title">مشخصات خود را وارد کنید </p>
                    <form className='register-form'>
                        <div className="register-form-gird">
                            <div className="signIn-input-wrapper">
                                <label htmlFor="nameEdit" className='lable-input'>نام</label>
                                <input
                                    type="text"
                                    id='nameEdit'
                                    className='input-form'
                                    value={name}
                                    onChange={(e) => setName(e.target.value.trimStart())}
                                />
                                {name === "" && formSubmitt && <p className='error-input'>نام را وارد کنید</p>}
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="last-nameEdit" className='lable-input'>نام خانوادگی</label>
                                <input
                                    type="text"
                                    id='last-nameEdit'
                                    className='input-form'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value.trimStart())}
                                />
                                {lastName === "" && formSubmitt && <p className='error-input'>نام خانوادگی را وارد کنید</p>}
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="postal-codeEdit" className='lable-input'>کد پستی</label>
                                <input
                                    type="text"
                                    id='postal-codeEdit'
                                    className='input-form'
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    style={{ textAlign: "right" }}
                                    dir='ltr'
                                />
                                {!regexPostalCode.test(postalCode) && formSubmitt && <p className='error-input'>کد پستی معتبر نیست</p>}
                            </div>
                            <div className="signIn-input-wrapper">
                                <label htmlFor="phoneEdit" className='lable-input'>موبایل</label>
                                <input
                                    type="text"
                                    id='phoneEdit'
                                    className='input-form'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {!regexPhone.test(phone) && formSubmitt && <p className='error-input'>شماره تماس معتبر نیست</p>}
                            </div>
                        </div>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="locationEdit" className='lable-input mt-3' >آدرس</label>
                            <input
                                type="text"
                                id='locationEdit'
                                className='input-form'
                                value={address}
                                onChange={(e) => setAddress(e.target.value.trimStart())}
                            />
                            {address === "" && formSubmitt && <p className='error-input'>نشانی خود را وارد کنید</p>}
                        </div>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="emailEdit" className='lable-input mt-3'>ایمیل</label>
                            <input
                                type="text"
                                id='emailEdit'
                                className='input-form'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {!regexEmail.test(email) && formSubmitt && <p className='error-input'>ایمیل معتبر نیست</p>}
                        </div>
                        <div className='mt-2 d-flex align-items-center'>
                            <input
                                type="checkbox"
                                onChange={() => setShowPasswordInputs(!showPasswordInputs)}
                            />
                            <label style={{ marginRight: "5px" }} className='lable-input mt-1'>ایا مایل به تغییر رمز هستید ؟</label>
                        </div>
                        {
                            showPasswordInputs &&
                            <div className="register-form-gird">
                                <div className="signIn-input-wrapper">
                                    <label htmlFor="passwordEdit" className='lable-input'>رمز</label>
                                    <input
                                        type="text"
                                        id='passwordEdit'
                                        className='input-form'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value.trimStart())}
                                    />
                                    {password === "" && formSubmitt && <p className='error-input'>رمز خود را وارد کنید</p>}
                                </div>
                                <div className="signIn-input-wrapper">
                                    <label htmlFor="confirm-passEdit" className='lable-input'>تایید رمز</label>
                                    <input
                                        type="text"
                                        id='confirm-passEdit'
                                        className='input-form'
                                        value={confirmPass}
                                        onChange={(e) => setConfirmPass(e.target.value)}
                                        onPaste={(e) => e.preventDefault()}
                                    />
                                    {confirmPass === "" && formSubmitt || confirmPass !== password && <p className='error-input'>رمز خود را تایید کنید</p>}
                                </div>
                            </div>
                        }

                        <div
                            className='mt-3 text-center'>
                            <button className='signIn-btn' onClick={(e) => changeInfo(e)}>ثبت نام</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
