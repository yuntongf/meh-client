
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/configureStore.js';
import NavBar from '../components/Nav/NavBar';
import { useEffect, useState } from 'react';
import Follows from '../components/Follow/Follows';
import { loadFollowing } from '../store/reducers/posts.js';
import { getUser } from '../services/UserServices';
import { baseURL } from '../services/HttpServices';

const FollowingPage = () => {
    const following = useSelector((store : RootState) => store.entities.following);
    const [follows, setFollows] = useState(following);
    const loggedInUser = getUser();
    const dispatch = useDispatch();

    function getFollowing() {
        fetch(`${baseURL}/api/user/following/${loggedInUser._id.toString()}`)
        .then(res => res.json())
        .then(function (following) {
            console.log("following", following);
            dispatch(loadFollowing(following));
        });
    }

    useEffect(() => {
        getFollowing();
    }, [following])

    return (
        <div className="mt-5">
            {/* {showFourYearPlan && <FourYearPlanPage />} */}
            <div className='d-flex justify-content-center'>
                <NavBar/>
                <div className="col-4">
                    <Follows follows={follows}/>
                </div>
            </div>
            
        </div>
    )
}

export default FollowingPage;