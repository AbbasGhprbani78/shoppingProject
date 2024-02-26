import React from 'react'
import './ShowAbout.css'
import { Link } from 'react-router-dom'
export default function ShowAbout() {
    return (
        <div className='show-about'>
            <div className="show-about-contect">
                <p className='show-about-text'>لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به </p>
                <Link className='link-btn show-about-register'>
                    ثبت نام کنید
                </Link>
            </div>
        </div>
    )
}
