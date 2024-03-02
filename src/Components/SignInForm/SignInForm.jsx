import React, { useState, useEffect } from 'react'
import './SignInForm.css'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IP } from '../../App';
import axios from 'axios';
export default function SignInForm({ showLoginForm, closeSignInForm }) {
    const [isPrivate, setIsPerivate] = useState(true);

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("")
    const regexPhone = /^(\+?\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

    const handleToggle = () => {
        setIsPerivate((e) => !e);
    }

    const closeHandler = () => {
        closeSignInForm()
        setPhone("")
        setPassword("")
    }

    const signIn = (e) => {
        e.preventDefault()

        if (!phone || !password) {
            alert("لطفا تمامی فیلدها را پر کنید");
            return;
        }
        if (!regexPhone.test(phone)) {
            alert("لطفا شماره تلفن معتبر وارد کنید")
            return;
        }

        const body = {

        }
        try {
            const response = axios.post(`${IP}`, body)
            if (response.status === 201) {
                console.log(response)
                closeHandler()
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className={`signIn-form-container ${showLoginForm ? "signIn-form-container-active" : ""}`}>
                <div className="signIn-form-wrapper">
                    <div className="signIn-form-header d-flex justify-content-between align-items-center">
                        ورود<CloseOutlinedIcon style={{ cursor: "pointer" }} onClick={closeHandler} />

                    </div>
                    <p className="signIn-form-title">مشخصات خود را وارد کنید </p>
                    <form className='signIn-form'>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="phonesign" className='lable-input'>موبایل</label>
                            <input
                                type="text"
                                id='phonesign'
                                className='input-form'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                autoComplete='false'
                            />
                        </div>
                        <div className="signIn-input-wrapper">
                            <label htmlFor="passwordSign" className='lable-input'>رمز</label>
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
                                    id="passwordSign"
                                    className='input-form input-password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete='false' />
                            </div>
                        </div>
                        <div className='mt-3 text-center'><button className='signIn-btn' onClick={(e) => signIn(e)}>ورود</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}
