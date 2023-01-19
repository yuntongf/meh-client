import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { IComment } from '../../store/configureStore';
import { RootState } from '../../store/configureStore.js';
import { Link } from 'react-router-dom';
import { like, unlike } from '../../services/SocialServices';
import { getUser } from '../../services/UserServices';

interface LikesButtonProps {
    post: IComment
}

const LikesButton = ({post} : LikesButtonProps) => {
    const dispatch = useDispatch();
    // get real time copy of post
    // const posts = useSelector((store : RootState) => store.entities.posts) || [];
    // var [temp] = posts.filter(p => p._id === post._id);
    const likedPosts = useSelector((store : RootState) => store.entities.liked) || [];
    var [liked] = likedPosts.filter(l => l === post._id);
    const [likeClicked, setLikeClicked] = useState(!!liked)
    let [likes, setLikes] = useState(post.likes);

    useEffect(() => {
        [liked] = likedPosts.filter(l => l === post._id);
        setLikeClicked(!!liked);
    }, [likedPosts]);

    const user = getUser();

    const handleLike = async () => {
        //dispatch(postLiked(post));
        setLikeClicked(!likeClicked);
        if (likeClicked) {
            // update the front end 
            setLikes(likes - 1);
            console.log(await unlike(post._id, likes - 1, user._id));
        }
        else {
            setLikes(likes + 1);
            await like(post._id, likes + 1, user._id);
            // update the backend
        }
    }
    //console.log(likedPosts);
    return (
        <>
            <Link className="text-decoration-none text-dark" to="" >
                <button className={`btn btn-sm col ${!!likeClicked && 'text-warning'}`} onClick={handleLike}>
                    ❤️ {likes} 
                </button>
            </Link>
        </>
    );
}

export default LikesButton;