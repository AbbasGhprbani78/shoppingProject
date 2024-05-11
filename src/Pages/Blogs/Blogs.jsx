import React, { useEffect, useState } from 'react'
import './Blogs.css'
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import { IP } from '../../App';
import dayjs from 'dayjs';
import { useSearchContext } from '../../Context/SearchContext';
import BoxProduct from '../../Components/BoxProduct/BoxProduct';
import ProductsWrapper from '../../Components/ProductsWrapper/ProductsWrapper';
import Paginations from '../../Components/Pagination/Pagination';
import { useParams } from 'react-router-dom'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
export default function Blogs() {

    const [allBlogs, setAllBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { searchResults } = useSearchContext();
    const [showBlog, setShowBlog] = useState([])
    const { number } = useParams()


    const getAllBLogs = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${IP}/product/get-weblog/`, {

            })
            if (response.status === 200) {
                setAllBlogs(response.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllBLogs()
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
                        {
                            loading ?
                                <>
                                    <div className='d-flex align-items-center justify-content-center spiner-blog'>
                                        <div className="spinner"></div>
                                    </div>
                                </> :
                                <>
                                    <div className="home-container">
                                        <Breadcrumb
                                            links={[
                                                { id: 1, title: "خانه", to: "" },
                                                {
                                                    title: `مقالات`
                                                }
                                            ]}
                                        />
                                        <div className="blog-container mt-5">
                                            {
                                                showBlog?.map((blog) => (
                                                    <Col
                                                        xs={12}
                                                        sm={6}
                                                        md={showBlog?.length === 2 ? 6 : 4}
                                                        className="blog-item"
                                                        key={blog.id}
                                                    >
                                                        <div style={{ width: "97%" }}>
                                                            <div className="blog-img-item-wrapper" style={{
                                                                backgroundImage: `url(${IP}${blog.image})`,
                                                                backgroundSize: "cover",
                                                                backgroundRepeat: "no-repeat",
                                                                backgroundPosition: "center"
                                                            }}
                                                            >
                                                                <div className="blog-content">
                                                                    <p className="blog-item-title fw-bold">{blog.title}</p>
                                                                    <div className='blog-item-btn-wrapper'>
                                                                        <Link to={`/blog/${blog.id}`} className='blog-item-btn'> بیشتر</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="blog-detail">
                                                                <span className='blog-item-auth'>{blog.user}</span>
                                                                <span className='blog-item-date'>{dayjs(blog.date).format("DD/MM/YYYY")}</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))
                                            }
                                        </div>
                                        <Paginations
                                            items={allBlogs}
                                            showcount={9}
                                            setShownProducts={setShowBlog}
                                            pathname={`/blogs`}
                                        />
                                    </div>
                                </>
                        }
                    </>
            }
        </>
    )
}
