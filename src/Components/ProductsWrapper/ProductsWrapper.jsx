import React from 'react'
import './ProductsWrapper.css'
import Button1 from '../Button1/Button1'


export default function ProductsWrapper({ title, link, children, isMore }) {
    return (
        <div className='Products-Wrapper'>
            <div className='Products-Wrapper-top d-flex  justify-content-between'>
                <p className={`Products-Wrapper-title ${isMore ? "" : "pd"}`}>{title}</p>
                {
                    isMore ?
                        <div style={{ marginLeft: "2%" }}>
                            <Button1
                                link={link}
                            />
                        </div> : null
                }

            </div>
            {children}
        </div >
    )
}
