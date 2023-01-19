import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IUser } from "../../store/configureStore";
import { userFollowed } from "../../store/reducers/courses";
import { userLoggedIn } from "../../store/reducers/auth";
import { RootState } from '../../store/configureStore.js';
import { useEffect, useState } from "react";
import { toastSuccess } from "../../services/NotificationServices";
import { ObjectId } from "bson";
import { getUserHelper } from "../../services/UserServices";
import { getJwt } from "../../services/AuthServices";
import jwtDecode from "jwt-decode";
import { follow } from "../../services/SocialServices";

interface UserHeaderProps {
    user_id: ObjectId
}

const UserHeader = ({user_id} : UserHeaderProps) => {
    const loggedInUser = useSelector((store : RootState) => store.auth.user);
    const dispatch = useDispatch();
    const following = useSelector((store : RootState) => store.entities.following) || [];
    console.log(following);

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

    async function getUser() {
        console.log(user_id.toString())
        const {data} = await getUserHelper(user_id);
        console.log(data);
        setUser(data);
    }

    function getLoggedInUserId() {
        const jwt = getJwt();
        const loggedInUser = jwtDecode(jwt as any) as IUser;
        return loggedInUser._id;
    }

    useEffect(() => {
        getUser();
    }, [loggedInUser]);

    const [followed, setFollowed] = useState(following.includes(user_id));
    let followButtonContent = followed ? 'Following' : 'Follow';

    const handleAuthorDetail = () => {
        dispatch(userLoggedIn(user));
    }
    
    const handleFollow = async () => {
        dispatch(userFollowed(user));
        setFollowed(true);
        // update backend as well
        await follow(getLoggedInUserId(), user._id);
    }
    return (
        <div className="d-flex justify-content-between">
            <Link to={`/profile/${user._id}`} className="text-decoration-none text-dark">  
                <div className="d-flex" onClick={handleAuthorDetail}>
                    <img src={user.pic} />
                    <div className="ms-3">
                        <div className="d-flex">
                            <div className="" style={{fontSize: 25}}>{user.username}</div> <div style={{fontSize: 15}} className="ms-2 mt-2 text-secondary">@{user.handle}</div>
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