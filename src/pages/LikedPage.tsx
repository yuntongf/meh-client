import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Nav/NavBar"
import Posts from "../components/SearchResult/Posts";
import { getUser } from "../services/UserServices";
import { RootState } from "../store/configureStore";
import { loadPosts } from "../store/reducers/courses";


const LikedPage = () => {
    const loggedInUser = getUser();
    const posts = useSelector((store : RootState) => store.entities.posts);
    const meh = useSelector((store : RootState) => store.nav.meh);
    
    const dispatch = useDispatch();

    async function getPosts() {
        fetch(`http://localhost:3001/api/user/liked/posts/${loggedInUser._id}`)
        .then(res => res.json())
        .then(function (posts) {
            dispatch(loadPosts(posts));
        })
    }

    useEffect(() => {
        // populate data: posts and accounts that user is followering
        getPosts(); 
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

export default LikedPage;