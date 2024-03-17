import React from 'react'
import './ModalBuy.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { IP } from '../../App';
export default function ModalBuy({ showProductModal, setShowProductModal, productInfo }) {

    return (
        <div className={`ModalBuy-container ${showProductModal ? "ModalBuy-container-active" : ""}`}>
            <div className="ModalBuy-wrapper">
                <div className="ModalBuy-top">
                    <div className="ModalBuy-title-wrapper">
                        <CheckCircleIcon style={{ color: "#3aad00" }} />
                        <p className="ModalBuy-title">این کالا به سبد خرید اضافه شد !</p>
                    </div>
                    <CloseIcon style={{ color: "#707070", cursor: "pointer" }} onClick={() => setShowProductModal(false)} />
                </div>
                <div className="ModalBuy-content">
                    <div className="ModalBuy-content-right">
                        {
                            productInfo &&
                            <img className='ModalBuy-content-img' src={`${IP}${productInfo.product[0] && productInfo.product[0].image[0]}`} alt="" />
                        }

                    </div>

                    <div className="ModalBuy-content-left">
                        {productInfo && productInfo.product[0].description}
                    </div>
                </div>
                <div className='ModalBuy-btn-wrapper'>
                    <Link to={'/basket'} style={{ all: "unset" }}>
                        <button className="ModalBuy-btn">برو به سبد خرید</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
