import React from 'react'
import './Button1.css'
import { Link } from 'react-router-dom'
export default function Button1({ link }) {
    return (
        <>
            <Link to={link} style={{ all: "unset" }}>
                <button className='btn-1'>
                    بیشتر...
                </button>
            </Link>

        </>
    )
}
