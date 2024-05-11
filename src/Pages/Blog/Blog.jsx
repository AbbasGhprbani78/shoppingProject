import React, { useEffect, useState } from 'react'
import './Blog.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { IP } from '../../App';
import dayjs from 'dayjs';
import { useSearchContext } from '../../Context/SearchContext';
import BoxProduct from '../../Components/BoxProduct/BoxProduct';
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper';
import { Col } from 'react-bootstrap';
import AuthContext from '../../Context/AuthContext';
import { useContext } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Comments from '../../Components/Comments/Comments';
import swal from 'sweetalert';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';

export default function Blog() {

    const { id } = useParams();
    const [mainBlog, setMainBlog] = useState("")
    const { searchResults } = useSearchContext();
    const [allComment, setAllComment] = useState([])
    const [comment, setComment] = useState(null);
    const authContext = useContext(AuthContext)

    const getMainLocation = async () => {

        try {
            const response = await axios.get(`${IP}/product/get-weblog-detail/${id}`, {
            })

            if (response.status === 200) {
                setMainBlog(response.data[0])
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getMainLocation()
    }, [])


    const getAllComment = async () => {
        try {
            const response = await axios.get(`${IP}/product/get-weblog-comment/${id}`)
            if (response.status === 200) {
                setAllComment(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const sendComment = async () => {
        const userID = localStorage.getItem("user_id");
        const access = localStorage.getItem('user')
        const headers = {
            Authorization: `Bearer ${access}`
        };
        const comments = {
            comment,
            weblog: Number(id),
            user_id: Number(userID)
        }

        try {
            const response = await axios.post(`${IP}/product/send-weblog-comment/`, comments, {
                headers
            })
            if (response.status === 201) {
                console.log(response.data)
                swal({
                    title: "پیام شما با موفقیت ثبت شد",
                    icon: "success",
                    button: "باشه"
                })
                setComment("")
                getAllComment()
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    const likeHandler = async (commentId) => {
        if (authContext.token) {
            const access = localStorage.getItem('user')
            const headers = {
                Authorization: `Bearer ${access}`
            };
            const body = {
                liked: true
            }
            try {
                const response = await axios.post(`${IP}/product/like-weblog/${commentId}`, body, {
                    headers
                })
                if (response.status === 201) {
                    getAllComment()
                }
            } catch (error) {
                console.log(error.message)

            }
        } else {
            swal({
                title: "برای ثبت  like یا dislike باید ثبت نام کنید",
                icon: "warning",
                button: "باشه"
            })
        }

    }

    const disLikeHandler = async (commentId) => {

        if (authContext.token) {
            const access = localStorage.getItem('user')
            const headers = {
                Authorization: `Bearer ${access}`
            };
            const body = {
                liked: false
            }
            try {
                const response = await axios.post(`${IP}/product/like-weblog/${commentId}`, body, {
                    headers
                })

                if (response.status === 201) {
                    getAllComment()
                }
            } catch (error) {
                console.log(error.message)
            }

        } else {
            swal({
                title: "برای ثبت  like یا dislike باید ثبت نام کنید",
                icon: "warning",
                button: "باشه"
            })
        }
    }

    useEffect(() => {
        getAllComment()
    }, [])

    return (
        <>
            {
                searchResults &&
                    searchResults.length > 0 ?
                    <>
                        <ProductsWrapper
                            isMore={false}
                        >
                            <div className="all-Products scroll-product">
                                {
                                    searchResults &&
                                    searchResults.map(product => (
                                        <Col xs={6} md={3} style={{ padding: "5px" }}>
                                            <BoxProduct
                                                id={product && product.sellers[0] && product.sellers[0].id}
                                                key={product.code}
                                                availability_count={product.availability_count}
                                                discount_percentage={product && product.sellers[0] && product.sellers[0].discount_percentage}
                                                price={product && product.sellers[0] && product.sellers[0].price}
                                                old_price={product && product.sellers[0] && product.sellers[0].old_price}
                                                image={product.image}
                                                name={product.name}
                                                model={product.model}
                                                is_discount={product && product.sellers[0] && product.sellers[0].is_discount}
                                                existence={product && product.sellers[0] && product.sellers[0].availability_status}
                                            />
                                        </Col>
                                    ))
                                }
                            </div>
                        </ProductsWrapper>
                    </>
                    :
                    <>
                        <div className="main-blog-container">
                            <div className="main-blog-img-wrapper" style={{
                                backgroundImage: `url(${IP}${mainBlog?.image})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                            </div>
                            <div className="main-blog-content">
                                <div className="main-blog-header">
                                    <p className='main-blog-header-title'>{mainBlog?.title}</p>
                                    <div className="main-blog-detail">
                                        <span className='main-blog-auth'>نویسنده ی مقاله :  {mainBlog?.user}</span>
                                        <span className='main-blog-date'>{dayjs(mainBlog.date).format("DD / MM / YYYY")}</span>
                                    </div>
                                </div>
                                <p className="main-blog-text">
                                    {mainBlog?.text}
                                </p>
                                <div className='comments-wrapper mt-4'>
                                    {
                                        allComment && allComment.length > 0 ?
                                            <>
                                                {
                                                    allComment.map(comment => (
                                                        <Comments
                                                            key={comment.id}
                                                            date={comment.date_time}
                                                            text={comment.comment}
                                                            id={comment.id}
                                                            dislike={comment.num_dislikes}
                                                            like={comment.num_likes}
                                                            likeHandler={() => likeHandler(comment.id)}
                                                            disLikeHandler={() => disLikeHandler(comment.id)}
                                                        />
                                                    ))
                                                }
                                            </> :
                                            <>
                                                <p className='alert-comment'>
                                                    هیچ کامنتی وجود ندارد
                                                </p>
                                            </>
                                    }
                                </div>
                                {
                                    authContext.token &&
                                    <div className="send-comment-wrapper pb-4">
                                        <div className="send-comment-wrapper-title">
                                            <EmailOutlinedIcon style={{ marginLeft: "12px" }} />
                                            ثبت دیدگاه شما
                                        </div>
                                        <div className='comment-place-wrapper'>
                                            <textarea
                                                onChange={(e) => setComment(e.target.value)}
                                                value={comment}
                                                className='comment-place'

                                            ></textarea>
                                        </div>
                                        <div className="send-score">
                                            <button className='btn-send-comment' onClick={sendComment}>ارسال</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                    </>
            }
        </>
    )
}
