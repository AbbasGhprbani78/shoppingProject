import React from 'react'
import Header from '../../Components/Header/Header'
import Silder from '../../Components/Silder/Silder'
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper'
import ShowAbout from '../../Components/ShowAbout/ShowAbout'
import Footer from '../../Components/Footer/Footer'
import './Home.css'

export default function Home() {
    return (
        <>
            <div style={{ width: "100%" }}>
                <Header />
                <div className="home-container">
                    <Silder />
                    <ProductsWrapper
                        title="تخفیف خورده ها"
                        link={"#"}
                    />
                    <ProductsWrapper
                        title="جدید ترین ها"
                        link={"#"}
                    />
                    <ShowAbout />
                </div>
                <Footer />

            </div>

        </>

    )
}
