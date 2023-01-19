import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { IPost } from '../../store/configureStore';
import { RootState } from '../../store/configureStore.js';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/UserServices';
import { save, unsave } from '../../services/SocialServices';

interface SavedButtonProps {
    post: IPost
}

const SavedButton = ({post} : SavedButtonProps) => {
    const savedPosts = useSelector((store : RootState) => store.entities.saved) || [];
    var [saved] = savedPosts.filter(l => l === post._id);
    const [saveClicked, setSaveClicked] = useState(!!saved)
    let [saves, setSaves] = useState(post.saved);

    useEffect(() => {
        [saved] = savedPosts.filter(s => s === post._id);
        setSaveClicked(!!saved);
    }, [savedPosts]);

    const user = getUser();

    const handleSave = async () => {
        //dispatch(postLiked(post));
        setSaveClicked(!saveClicked);
        if (saveClicked) {
            // update the front end 
            setSaves(saves - 1);
            console.log(await unsave(post._id, saves - 1, user._id));
        }
        else {
            setSaves(saves + 1);
            await save(post._id, saves + 1, user._id);
            // update the backend
        }
    }
    return (
        <div>  
            <Link className="text-decoration-none text-dark" to="" >
                <button className={`btn btn-sm col ${!!saveClicked && 'text-warning'}`} onClick={handleSave}>
                Saved {saves}
                </button>
            </Link>
        </div>
    );
}

export default SavedButton;