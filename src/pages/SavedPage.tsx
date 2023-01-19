import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Nav/NavBar"
import Posts from "../components/SearchResult/Posts";
import { RootState } from "../store/configureStore";
import { loadPosts } from "../store/reducers/posts";

const SavedPage = () => {
    const posts = useSelector((store : RootState) => store.entities.posts);
    
    useEffect(() => {
        loadPosts(posts);
    }, [posts])

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

export default SavedPage;