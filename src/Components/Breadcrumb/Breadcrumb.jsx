import React from 'react'
import './Breadcrumb.css'
import { Link } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
export default function Breadcrumb({ links }) {
    return (
        <div className="breadcrumb-container">
            {
                links.map((link, i) => (
                    <div key={i} className="breadcrumb-items">
                        <Link to={`/${link.to}`} className="breadcrumb_link">
                            {link.title}
                            {
                                link.id ? (
                                    <ArrowBackIosNewIcon style={{ fontSize: ".7rem", marginRight: "10px" }} />
                                ) : null
                            }
                        </Link>
                    </div>
                ))
            }

        </div>
    )
}


