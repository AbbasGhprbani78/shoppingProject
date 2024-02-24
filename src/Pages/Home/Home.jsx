import React from 'react'
import Header from '../../Components/Header/Header'
import Silder from '../../Components/Silder/Silder'
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper'
import './Home.css'

export default function Home() {
    return (
        <>
            <Header />
            <div className="home-container">

                <Silder />
                {/* <ProductsWrapper />
                <ProductsWrapper /> */}
            </div>
        </>

    )
}
