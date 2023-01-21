import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IUser } from "../../store/configureStore";
import { userFollowed, userSet, userUnfollowed } from "../../store/reducers/posts";
import { RootState } from '../../store/configureStore.js';
import { useEffect, useState } from "react";
import { ObjectId } from "bson";
import { getUserHelper } from "../../services/UserServices";
import { getJwt } from "../../services/AuthServices";
import jwtDecode from "jwt-decode";
import { follow, unfollow } from "../../services/SocialServices";
import { profilePicStyleSmall } from "../../styles/DetailStyles";

interface UserHeaderProps {
    user_id: ObjectId
}

const UserHeader = ({user_id} : UserHeaderProps) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((store : RootState) => store.auth.user);

    const [hover, setHover] = useState(false);

    // see if the logged in user is a follower
    const usersFollowing = useSelector((store : RootState) => store.entities.following);
    const [followed, setFollowed] = useState(usersFollowing.includes(user_id));
    let followButtonContent = followed ? 'Following' : 'Follow';
    if (hover && followed) followButtonContent = 'Unfollow';
    
    useEffect(() => {
        setFollowed(usersFollowing.includes(user_id));
    }, [usersFollowing]);

    // local state variables
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
        /* set entities.user to logged in user, will be used by SideUserHeader 
            element in profile page which takes in IUser as argument */
        dispatch(userSet(user)); 
    }
    
    const handleFollow = async () => {
        if (!followed) {
            dispatch(userFollowed(user_id)); // // client side redux store
            setFollowed(true);
            await follow(getLoggedInUserId(), user._id); // server side 
        } else {
            dispatch(userUnfollowed(user_id)); 
            setFollowed(false);
            await unfollow(getLoggedInUserId(), user._id);
        }
    }

    // these two functions are for 
    const handleHover = (e : any) => {
        setHover(true);
        if (followed) {
            e.target.classList.add('btn-outline-danger')
        } 
    }

    const handleLeaveHover = (e : any) => {
        setHover(false);
        e.target.classList.remove('btn-outline-danger')
    }

    return (
        <div className="d-flex justify-content-between">
            <Link to={`/profile/${user._id}`} className="text-decoration-none text-dark" onClick={handleProfile}>  
                <div className="d-flex">
                    <img className="mt-1" src={user.pic} style={profilePicStyleSmall}/>
                    <div className="ms-4">
                        <div className="d-flex">
                            <div className="" style={{fontSize: 28}}>{user.username}</div> 
                            <div style={{fontSize: 15}} className="ms-2 mt-2 text-secondary">@{user.handle}</div>
                        </div>
                        <p style={{fontSize: 15}}>{user.status}</p>
                    </div>
                </div>
            </Link>
            {
            <button className={followed ? 'btn mt-3 btn-outline-secondary' : 'btn mt-3 btn-primary'}
                    onClick={handleFollow}
                    style={{height: 37, width: 100, borderRadius: '30px'}}
                    onMouseOver={(e) => handleHover(e)}
                    onMouseOut={(e) => handleLeaveHover(e)}>
                {followButtonContent}
            </button>}
        </div>
    );
}

export default UserHeader;