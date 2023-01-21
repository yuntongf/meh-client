
import { useSelector, useDispatch } from 'react-redux';
import { loadFollowing } from '../store/reducers/posts.js';
import { RootState } from '../store/configureStore.js';
import Posts from '../components/SearchResult/Posts';
import NavBar from '../components/Nav/NavBar';
import { useEffect } from 'react';
import { loadPosts } from '../store/reducers/posts.js';
import { getUser } from '../services/UserServices';
import { baseURL } from '../services/HttpServices';
import Articles from '../components/News/Articles';

export const postsSectionStyle = {maxHeight: 750, overflow: 'auto'};

const MainPage = () => {
    const loggedInUser = getUser();

    // state control variables
    const posts = useSelector((store : RootState) => store.entities.posts);
    const modalOpen = useSelector((store : RootState) => store.nav.modalOpen);
    
    const dispatch = useDispatch();

    async function getPosts() {
        fetch(`${baseURL}/api/posts`)
        .then(res => res.json())
        .then(function (posts) {
            dispatch(loadPosts(posts));
        })
    }
    
    async function getFollowing() {
        fetch(`${baseURL}/api/user/following/${loggedInUser._id.toString()}`)
        .then(res => res.json())
        .then(function (following) {
            dispatch(loadFollowing(following));
        });
    }

    useEffect(() => {
        // populate data: posts and accounts that user is followering
        getPosts();
        getFollowing();
      }, [modalOpen]);

    return (
        <div>
            <div className='d-flex'>
                <NavBar/>
                <div className='col-6 ps-4' style={postsSectionStyle}>
                    {posts && <Posts />}
                </div>
                <Articles/>
            </div>
        </div>
    )
}

export default MainPage;