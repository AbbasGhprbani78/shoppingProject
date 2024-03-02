import React, { useState } from 'react'
import './Comments.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { IP } from '../../App'
import axios from 'axios';
export default function Comments() {

    const [like, setLike] = useState(0)
    const [disLike, setDisLike] = useState(0)
    const likeHandler = () => {

        setLike(prevState => prevState + 1)
    }
    const disLikeHandler = () => {
        setDisLike(prevState => prevState + 1)
    }

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
                <div className='div-like text-center'>
                    <div className=" like-con"><ThumbUpIcon onClick={likeHandler} /></div>
                    <p>{like > 0 ? like : 0}</p>
                </div>
                <div className='div-dislike text-center'>
                    <div className="like-con"><ThumbDownIcon onClick={disLikeHandler} /></div>
                    <p>{disLike > 0 ? disLike : 0}</p>
                </div>
            </div>
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

