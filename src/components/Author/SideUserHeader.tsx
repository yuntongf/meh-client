import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/configureStore";
import { userLoggedIn } from "../../store/reducers/auth";
import { profilePicStyleLarge } from "../../styles/DetailStyles";


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
                <img src={user.pic} style={profilePicStyleLarge}/>
            </div>
            <div className="d-flex justify-content-center" onClick={handleAuthorDetail}>
                <div>
                    <div className="d-flex mt-3">
                        <h3>{user.username}</h3> 
                    <h5 className="ms-2 mt-1" style={{fontSize:20}}>@{user.handle}</h5>
                    </div>
                </div>
            </div>
            
        </Link>
        <div className="d-flex justify-content-center">
            <p>{user.status}</p>
        </div>
        </>
    );
}

export default SideUserHeader;