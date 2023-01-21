import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { IPost } from '../../store/configureStore';
import { RootState } from '../../store/configureStore.js';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/UserServices';
import { like, unlike } from '../../services/SocialServices';
import { postLiked } from '../../store/reducers/posts';

interface LikesButtonProps {
    post: IPost
}

const LikesButton = ({post} : LikesButtonProps) => {
    const dispatch = useDispatch();
    const user = getUser();
    
    // get the post in store
    const posts = useSelector((store : RootState) => store.entities.posts);
    const [postInStore] = posts.filter(p => p._id === post._id);
    
    // get likedPosts and give determine is the post has been liked by user 
    const likedPosts = useSelector((store : RootState) => store.entities.liked) || [];
    var [liked] = likedPosts.filter(s => s === post._id);
    const [likeClicked, setLikeClicked] = useState(!!liked); 

    // update if currentpost is liked after likedPosts array changes
    useEffect(() => {
        [liked] = likedPosts.filter(l => l === post._id);
        setLikeClicked(!!liked);
    }, [likedPosts]);

    const handleLike = async () => {
        setLikeClicked(!likeClicked);
        if (likeClicked) {
            // handle client side with redux
            dispatch(postLiked({_id: post._id, likes: postInStore.likes - 1 }));
            // update in the database
            await unlike(post._id, postInStore.likes - 1, user._id);
        }
        else {
            dispatch(postLiked({_id: post._id, likes: postInStore.likes + 1 }));
            await like(post._id, postInStore.likes + 1, user._id);
        }
    }
    return (
        <div>  
            <Link className="text-decoration-none text-dark" to="" >
                <button className={`btn col ${!!likeClicked && 'text-danger'}`} onClick={handleLike}>
                    {likeClicked ? '♥' : '♡'} {postInStore.likes}
                </button>
            </Link>
        </div>
    );
}

export default LikesButton;