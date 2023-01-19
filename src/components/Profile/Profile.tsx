import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../../store/reducers/courses';
import { userLoggedIn } from '../../store/reducers/auth';
import SideUserHeader from '../Author/SideUserHeader';
import Posts from '../SearchResult/Posts';
import { toastSuccess } from '../../services/NotificationServices';
import { Link, useParams } from 'react-router-dom';
import { ObjectId } from 'bson';
import { edit, getUser } from '../../services/UserServices';
import { RootState } from '../../store/configureStore';
import { baseURL } from '../../services/HttpServices';

const Profile = () => {
    const {id} = useParams();
    const postUrl = `http://localhost:3001/api/${id}/posts`;
    const dispatch = useDispatch();
    const user = useSelector((store : RootState) => store.auth.user);

    const [profile, setProfile] = useState({
        _id: new ObjectId(id),
        username: "", handle: "", status: "", pic:"",
        following: false
    })
    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState(profile.username);
    const [handle, setHandle] = useState(profile.handle);
    const [status, setStatus] = useState(profile.status);

    useEffect(() => {
        fetch(`${baseURL}/api/user/${id}`)
        .then(res => res.json())
        .then(function (profile) {
            setProfile(profile);
            fetch(postUrl)
            .then(res => res.json())
            .then(function (posts) {
                dispatch(loadPosts(posts));
            })
        }
    )}, [user]);
    
    useEffect(() => {
        setUsername(profile.username);
        setHandle(profile.handle);
        setStatus(profile.status);
    }, [profile]);

    const handleEdit = () => {
        setEditing(!editing);
    }
    
    const handleSaveChanges = async () => {
        // state control
        setEditing(!editing);

        // frontend update
        toastSuccess('Changes saved!')

        // backend update 
        const user = await edit(new ObjectId(id), username, handle, status);
        dispatch(userLoggedIn(user));
    }
    return (
        <>  
        {profile &&
            <>
                <button className='btn btn-primary' onClick={handleEdit} style={{height: 50, width: 120}}>
                    {!editing? "Edit Profile" : "Finish Edit"}
                </button>
                <SideUserHeader />
            
                {editing &&
                <div>
                    <div className='row row-cols-2'>
                        <div>username</div>
                        <input value={username} onChange={(e) => setUsername(e.target.value)}/>

                        <div>userhandle</div>
                        <input value={handle} onChange={(e) => setHandle(e.target.value)}/>

                        <div>Update Status</div>
                        <input value={status} onChange={(e) => setStatus(e.target.value)}/>

                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                        <button className='btn btn-primary' onClick={handleSaveChanges}>
                            Save Changes
                        </button>
                    </div>
                </div>}

                <h4 className='mt-3 mb-3'>Your Posts:</h4>
                <div>
                    <Posts/>
                </div>
            </>}
        </>
    );
};

export default Profile;