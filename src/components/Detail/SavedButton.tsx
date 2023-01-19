import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { IPost } from '../../store/configureStore';
import { RootState } from '../../store/configureStore.js';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/UserServices';
import { save, unsave } from '../../services/SocialServices';
import { postSaved } from '../../store/reducers/posts';

interface SavedButtonProps {
    post: IPost
}

const SavedButton = ({post} : SavedButtonProps) => {
    const dispatch = useDispatch();
    const user = getUser();
    
    // get the post in store
    const posts = useSelector((store : RootState) => store.entities.posts);
    const [postInStore] = posts.filter(p => p._id === post._id);
    
    // get savedPosts and give determine is the post has been saved by user 
    const savedPosts = useSelector((store : RootState) => store.entities.saved) || [];
    var [saved] = savedPosts.filter(s => s === post._id);
    const [saveClicked, setSaveClicked] = useState(!!saved);

    useEffect(() => {
        // update if currentpost is saved after savedPosts array changes
        [saved] = savedPosts.filter(l => l === post._id);
        setSaveClicked(!!saved);
    }, [savedPosts]);

    const handleSave = async () => {
        setSaveClicked(!saveClicked);
        if (saveClicked) {
            // handle client side with redux
            dispatch(postSaved({_id: post._id, saves: postInStore.saved - 1 }));
            // update in the database
            await unsave(post._id, postInStore.saved - 1, user._id);
        }
        else {
            dispatch(postSaved({_id: post._id, saves: postInStore.saved + 1 }));
            await save(post._id, postInStore.saved + 1, user._id);
        }
    }
    return (
        <div>  
            <Link className="text-decoration-none text-dark" to="" >
                <button className={`btn col ${!!saveClicked && 'text-warning'}`} onClick={handleSave}>
                Saved {postInStore.saved}
                </button>
            </Link>
        </div>
    );
}

export default SavedButton;