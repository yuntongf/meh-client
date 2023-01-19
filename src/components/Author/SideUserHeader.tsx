import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IUser, RootState } from "../../store/configureStore";
import { userLoggedIn } from "../../store/reducers/auth";

const SideUserHeader = () => {
    const dispatch = useDispatch();
    const user = useSelector((store : RootState) => store.entities.user);

    const handleAuthorDetail = () => {
        dispatch(userLoggedIn(user));
    }
    return (
        <>
        
        <Link to="" className="text-decoration-none text-dark">  
            <div className="d-flex justify-content-center" onClick={handleAuthorDetail}>
                <img src={user.pic} style={{boxShadow: '3px 3px 4px 2px rgba(237, 231, 225, .8)'}}/>
            </div>
            <div className="d-flex justify-content-center" onClick={handleAuthorDetail}>
                <div>
                    <div className="d-flex mt-3">
                        <h3>{user.username}</h3> 
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center" onClick={handleAuthorDetail}>
                <h5 className="ms-2 text-secondary" style={{fontSize:18}}>@{user.handle}</h5>
            </div>
        </Link>
        <div className="d-flex justify-content-center">
            <p>{user.status}</p>
        </div>
        </>
    );
}

export default SideUserHeader;