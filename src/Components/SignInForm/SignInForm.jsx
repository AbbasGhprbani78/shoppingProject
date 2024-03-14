import React, { useState, useEffect } from 'react'
import './SignInForm.css'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IP } from '../../App';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import swal from 'sweetalert';
export default function SignInForm({ showLoginForm, closeSignInForm }) {

    const [isPrivate, setIsPerivate] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    const [formSubmitt, setFormSubmitt] = useState(false)
    const authContext = useContext(AuthContext);

    const handleToggle = () => {
        setIsPerivate((e) => !e);
    }

    const closeHandler = () => {
        closeSignInForm()
        setEmail("")
        setPassword("")
        setFormSubmitt(false)
    }

    const signIn = async (e) => {
        e.preventDefault()
        setFormSubmitt(true)

        if (!email || !password || !regexEmail.test(email)) {

            return;
        }
        const body = {
            username: email,
            password
        }
        try {
            const response = await axios.post(`${IP}/user/login/`, body)
            if (response.status === 200) {
                authContext.login(response.data)
                swal({
                    title: `خوش اومدی`,
                    icon: "success",
                    button: "باشه"
                })
                closeHandler()
            }

        } catch (error) {
            swal({
                title: `چنین کاربری وجود ندارد`,
                icon: "error",
                button: "باشه"
            })
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
                            <lable htmlFor="emailsign" className='lable-input'>ایمیل</lable>
                            <input
                                type="email"
                                id='emailsign'
                                className='input-form'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete='false'
                            />
                            {!regexEmail.test(email) && formSubmitt && <p className='error-input'>ایمیل معتبر نیست</p>}
                        </div>
                        <div className="signIn-input-wrapper" style={{ marginTop: "5px" }}>
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
                                    onChange={(e) => setPassword(e.target.value.trimStart())}
                                    autoComplete='false' />
                            </div>
                            {password === "" && formSubmitt && <p className="error-input">رمز خود را وارد کنید</p>}
                        </div>
                        <div className='mt-3 text-center'><button className='signIn-btn' onClick={(e) => signIn(e)}>ورود</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}
