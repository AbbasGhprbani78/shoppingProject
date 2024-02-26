import React from 'react'
import './ProductsWrapper.css'
import Button1 from '../Button1/Button1'


export default function ProductsWrapper({ title, link, children }) {
    return (
        <div className='Products-Wrapper'>
            <div className='Products-Wrapper-top d-flex  justify-content-between'>
                <p className='Products-Wrapper-title'>{title}</p>
                <div style={{ marginLeft: "2%" }}>
                    <Button1
                        link={link}
                    />
                </div>
            </div>
            {children}
        </div >
    )
}
