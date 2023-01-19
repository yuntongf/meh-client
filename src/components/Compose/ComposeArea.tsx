// import {contentAdded, contentTrashed} from '../../store/reducers/courses';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { toastSuccess, toastWarn } from '../../services/NotificationServices';
import { RootState } from '../../store/configureStore';
import { mehSet } from '../../store/reducers/nav';
import { post } from '../../services/ComposeServices';

const ComposeArea = () => {
    const meh = useSelector((store : RootState) => store.nav.meh);

    const [content, setNote] = useState("");
    const [tags, setTags]: [string[], any] = useState([]);
    const [newTag, setNewTag] = useState("");

    const dispatch = useDispatch();
    const author = useSelector((store : RootState) => store.auth.user);

    const handleTrash = () => {
        setNote("");
    }

    const handleMeh = async () => {
        if (!content) toastWarn('Post cannot be empty!');
        else {
            // update in the backend
            console.log(author);
            await post(author._id, content, tags);
            toastSuccess('Meh!');
            dispatch(mehSet(false));
        }
    }

    const handleAddTag = () => {
        const newTags = [...tags, newTag];
        setTags(newTags);
        setNewTag("");
    }

    return (
            <div className="mt-4">
                <div className="">
                    <textarea name='content' className='form-control' placeholder='Meh!' value={content} onChange={e => setNote(e.currentTarget.value)} rows={10} />
                </div>
                <div className='d-flex justify-content-between mt-3'>
                    <div>
                        Tags: 
                        {tags.map(tag => (
                            <>
                            {tag && 
                            <div className='btn btn-sm btn-outline-primary me-2'>
                                {tag}
                            </div>}
                            </>
                        ))}
                        <input style={{width: 50}} value={newTag} onChange={(e) => setNewTag(e.target.value)}/>
                        <button className='btn btn-sm' onClick={handleAddTag}>add</button>
                    </div>

                </div>
                    <div className='d-flex justify-content-end'>
                        {content && <button onClick={() => handleTrash()} className="btn btn-sm btn-outline-warning" > 🗑 </button>}
                        <button onClick={handleMeh} className="btn btn-primary" style={{borderRadius: '40px', width: 80}}> Meh! </button>
                    </div>
            </div>
    );
}

export default ComposeArea;