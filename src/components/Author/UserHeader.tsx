import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IUser } from "../../store/configureStore";
import { userFollowed, userSet } from "../../store/reducers/posts";
import { RootState } from '../../store/configureStore.js';
import { useEffect, useState } from "react";
import { ObjectId } from "bson";
import { getUserHelper } from "../../services/UserServices";
import { getJwt } from "../../services/AuthServices";
import jwtDecode from "jwt-decode";
import { follow } from "../../services/SocialServices";
import { profilePicStyleSmall } from "../../styles/DetailStyles";

interface UserHeaderProps {
    user_id: ObjectId
}

const UserHeader = ({user_id} : UserHeaderProps) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((store : RootState) => store.auth.user);

    // see if the logged in user is a follower
    const following = useSelector((store : RootState) => store.entities.following) || [];
    const [followed, setFollowed] = useState(following.includes(user_id));
    let followButtonContent = followed ? 'Following' : 'Follow';
    useEffect(() => {
        setFollowed(following.includes(user_id));
    }, [following]);

    var [user, setUser] = useState(
        {
            pic:"",
            _id: new ObjectId(0),
            handle: "",
            username: "",
            status: "",
            following: false
        })
    useEffect(() => {
        getUser();
    }, [loggedInUser]);
    
    async function getUser() {
        const {data} = await getUserHelper(user_id);
        setUser(data);
    }
    
    function getLoggedInUserId() {
        const jwt = getJwt();
        const loggedInUser = jwtDecode(jwt as any) as IUser;
        return loggedInUser._id;
    }

    const handleProfile = () => {
        /* set entities.user to logged in user, since the SideUserHeader 
            element in profile page takes in IUser as argument */
        dispatch(userSet(user)); 
    }
    
    // update both client side and server side
    const handleFollow = async () => {
        dispatch(userFollowed(user));
        setFollowed(true);
        await follow(getLoggedInUserId(), user._id);
    }

    return (
        <div className="d-flex justify-content-between">
            <Link to={`/profile/${user._id}`} className="text-decoration-none text-dark" onClick={handleProfile}>  
                <div className="d-flex">
                    <img className="mt-1" src={user.pic} style={profilePicStyleSmall}/>
                    <div className="ms-4">
                        <div className="d-flex">
                            <div className="" style={{fontSize: 28}}>{user.username}</div> <div style={{fontSize: 15}} className="ms-2 mt-2 text-secondary">@{user.handle}</div>
                        </div>
                        <p style={{fontSize: 15}}>{user.status}</p>
                    </div>
                </div>
            </Link>
            {getLoggedInUserId() !== user_id &&
            <button className={`btn mt-3 btn-${followed ? 'outline-secondary disabled' : 'primary'}`} onClick={handleFollow}
                    style={{height: 37, borderRadius: '30px'}}>
                {followButtonContent}
            </button>}
        </div>
    );
}

export default UserHeader;