import React from 'react'
import './Comments.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
export default function Comments() {
    return (
        <div className='comment-wrapper'>
            <div className='d-flex  comment-img-text'>
                <div className="comment-img-wrapper">
                    <PersonOutlineIcon className='comment-img' />
                </div>
                <p className="comment-text">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                </p>
            </div>
            <div className="like-dislike-wrapper">
                <div className="div-like like-con"><ThumbUpIcon /></div>
                <div className="div-dislike like-con"><ThumbDownIcon /></div>
            </div>
        </div>
    )
}
