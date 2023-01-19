import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IUser } from "../../store/configureStore";
import { userFollowed } from "../../store/reducers/courses";
import { userLoggedIn } from "../../store/reducers/auth";
import { useEffect, useState } from "react";
import { ObjectId } from "bson";
import { getUserHelper } from "../../services/UserServices";
import { getJwt } from "../../services/AuthServices";
import jwtDecode from "jwt-decode";
import { follow } from "../../services/SocialServices";

interface SmallUserHeaderProps {
    user_id: ObjectId
}

const SmallUserHeader = ({user_id} : SmallUserHeaderProps) => {
    const dispatch = useDispatch();
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
        const {data} = await getUserHelper(user_id);
        setUser(data);
    }
    useEffect(() => {
        getUser();
    }, []);

    function getLoggedInUserId() {
        const jwt = getJwt();
        const loggedInUser = jwtDecode(jwt as any) as IUser;
        return loggedInUser._id;
    }
    
    return (
        <div className="d-flex justify-content-between">
            <Link to={`/profile/${user._id}`} className="text-decoration-none text-dark">  
                <div className="d-flex">
                    <img src={user.pic}/>
                    <div>
                        <div className="d-flex">
                            <div className="" style={{fontSize: 25}}>{user.username}</div> <div style={{fontSize: 15}} className="ms-2 mt-2 text-secondary">@{user.handle}</div>
                        </div>
                        <p style={{fontSize: 15}}>{user.status}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SmallUserHeader;