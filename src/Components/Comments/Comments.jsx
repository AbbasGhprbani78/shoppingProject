import React, { useState } from 'react'
import './Comments.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { IP } from '../../App'
import axios from 'axios';
import dayjs from 'dayjs';
import swal from 'sweetalert';
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


// const [like, setLike] = useState(0);
// const [disLike, setDisLike] = useState(0);
// const [initialLikes, setInitialLikes] = useState(0);
// const [initialDislikes, setInitialDislikes] = useState(0);

// useEffect(() => {
//     fetchInitialCounts();
// }, []);

// const fetchInitialCounts = async () => {
//     try {
//         const response = await axios.get('your_api_endpoint_to_get_initial_counts');
//         setInitialLikes(response.data.likes);
//         setInitialDislikes(response.data.dislikes);
//     } catch (error) {
//         console.error('Error fetching initial counts:', error);
//     }
// };

// const likeHandler = async () => {
//     try {
//         await axios.post('your_api_endpoint_to_increment_like', { value: like });
//         setLike(like + 1);
//     } catch (error) {
//         console.error('Error incrementing like:', error);
//     }
// };

// const disLikeHandler = async () => {
//     try {
//         await axios.post('your_api_endpoint_to_increment_dislike', { value: disLike });
//         setDisLike(disLike + 1);
//     } catch (error) {
//         console.error('Error incrementing dislike:', error);
//     }
// };

// return (
//     <div className='comment-wrapper'>
//         <div className='d-flex comment-img-text'>
//             <div className="comment-img-wrapper">
//                 <PersonOutlineIcon className='comment-img' />
//             </div>
//             <p className="comment-text">Your comment text here...</p>
//         </div>
//         <div className="like-dislike-wrapper">
//             <div className='div-like text-center'>
//                 <div className="like-con"><ThumbUpIcon onClick={likeHandler} /></div>
//                 <p>{initialLikes}</p>
//             </div>
//             <div className='div-dislike text-center'>
//                 <div className="like-con"><ThumbDownIcon onClick={disLikeHandler} /></div>
//                 <p>{initialDislikes}</p>
//             </div>
//         </div>
//     </div>
// );

