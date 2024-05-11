import React from 'react'
import './Comments.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import dayjs from 'dayjs';

export default function Comments({
    date,
    text,
    id,
    dislike,
    like,
    likeHandler,
    disLikeHandler
}) {

    const newDate = dayjs(date).format("YYYY/MM/DD HH:mm")


    return (

        <div className='comment-wrapper'>
            <div className="comment-content">
                <div className='d-flex  comment-img-text'>
                    <div className="comment-img-wrapper">
                        <PersonOutlineIcon className='comment-img' />
                    </div>
                    <p className="comment-text">
                        {text}
                    </p>
                </div>
                <div className="like-dislike-wrapper">
                    <div className='div-like text-center'>
                        <div className=" like-con"><ThumbUpIcon onClick={() => likeHandler(id)} /></div>
                        <p>{like}</p>
                    </div>
                    <div className='div-dislike text-center'>
                        <div className="like-con"><ThumbDownIcon onClick={() => disLikeHandler(id)} /></div>
                        <p>{dislike}</p>
                    </div>
                </div>
            </div>
            <p className="date-comment mt-2">{newDate}</p>
        </div>
    )
}

