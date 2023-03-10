import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Nav/NavBar"
import Articles from "../components/News/Articles";
import Posts from "../components/SearchResult/Posts";
import { RootState } from "../store/configureStore";
import { loadPosts } from "../store/reducers/posts";

const SavedPage = () => {
    const posts = useSelector((store : RootState) => store.entities.posts);
    
    useEffect(() => {
        loadPosts(posts);
    }, [posts])

    return (
        <div>
            <div className='d-flex'>
                <NavBar/>
                <div className='col-6 ps-4' style={{maxHeight: 700, overflow: 'auto' }}>
                    {posts && <Posts />}
                </div>
                <Articles/>
            </div>
        </div>
    )
}

export default SavedPage;