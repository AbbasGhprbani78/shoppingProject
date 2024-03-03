import React from 'react'
import './ModalBuy.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
export default function ModalBuy({ showProductModal, setShowProductModal }) {

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
                        <img className='ModalBuy-content-img' src="../../../public/Images/1.jpeg" alt="" />
                    </div>
                    <div className="ModalBuy-content-left">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni corrupti exercitationem voluptatem? Facilis maxime consequatur tempora rerum optio aut eos, nihil officia impedit quisquam culpa natus dolorem doloremque mollitia dicta?
                    </div>
                </div>
                <div className='ModalBuy-btn-wrapper'>
                    <button className="ModalBuy-btn">برو به سبد خرید</button>
                </div>
            </div>
        </div>
    )
}
