import React, { useState, useEffect } from 'react'
import './Pagination.css'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Paginations({
    items,
    showcount,
    setShownProducts,
    pathname }) {


    const [pagesCount, setPagesCount] = useState(null);
    const { number } = useParams()

    useEffect(() => {

        let endIndex = number * showcount
        let startIndex = endIndex - showcount
        let showProductTodos = items.slice(startIndex, endIndex)
        setShownProducts(showProductTodos)
        let numberOfPage = Math.ceil(items.length / showcount)
        setPagesCount(numberOfPage)

    }, [number, items])

    const handlePageChange = (event, value) => {
        window.history.pushState({}, "", `${pathname}/${value}`);
    };

    return (
        <>
            <div className='pagination-wrapper'>
                <Pagination
                    count={pagesCount}
                    page={Number(number)}
                    onChange={handlePageChange}
                    shape="rounded"
                    variant="outlined"
                    color="primary"
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`${pathname}/${item.page}`}
                            {...item}
                        />
                    )}
                />
            </div>
        </>
    )
}
