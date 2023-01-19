


import { useSelector, useDispatch } from 'react-redux';
import { loadFollowing } from '../store/reducers/courses.js';
import { RootState } from '../store/configureStore.js';
import Posts from '../components/SearchResult/Posts';
import NavBar from '../components/Nav/NavBar';
import { useEffect } from 'react';
import { loadPosts } from '../store/reducers/courses.js';
import { toastSuccess } from '../services/NotificationServices';
import { getUser } from '../services/UserServices';

const MainPage = () => {
    // some state control variables
    const loggedInUser = getUser();
    const posts = useSelector((store : RootState) => store.entities.posts);
    const meh = useSelector((store : RootState) => store.nav.meh);
    
    const dispatch = useDispatch();

    async function getPosts() {
        fetch(`http://localhost:3001/api/posts`)
        .then(res => res.json())
        .then(function (posts) {
            dispatch(loadPosts(posts));
        })
    }

    function getFollowing() {
        fetch(`http://localhost:3001/api/user/following/${loggedInUser._id.toString()}`)
        .then(res => res.json())
        .then(function (following) {
            console.log("following", following);
            dispatch(loadFollowing(following));
        });
    }

    useEffect(() => {
        // populate data: posts and accounts that user is followering
        getPosts(); 
        getFollowing();
      }, [meh]);

    return (
        <div className="mt-5">
            <div className='d-flex justify-content-center'>
                <NavBar/>
                <div className='col-5 ps-4' style={{maxHeight: 700, overflow: 'auto' }}>
                    {posts && <Posts />}
                </div>
            </div>
        </div>
    )
}

export default MainPage;