import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../store/configureStore";
import UserHeader from "./UserHeader";
import { RootState } from '../../store/configureStore';
import { toastSuccess } from "../../services/NotificationServices";
import { loadPosts } from "../../store/reducers/courses";
import posts from "../../data/posts";
import Posts from "../SearchResult/Posts";
import SideUserHeader from "./SideUserHeader";

const UserWindow = () => {
    const dispatch = useDispatch();
    const user = useSelector((store : RootState) => store.auth.user);
    const posts = useSelector((store : RootState) => store.entities.posts);
    useEffect(() => {
        // get data from back end
        fetch(`/api/posts`) /// CHANGE THIS !!!!!
        .then(res => res.json())
        .then(function (posts) {
        dispatch(loadPosts(posts));
        toastSuccess('reload');
        })
      }, [user]);

    return(
        <div>
            <SideUserHeader/>
            <h4>Recent posts:</h4>
            <div className='pe-4' style={{maxHeight:500, overflow: 'auto' }}>
                <Posts/>
            </div>
        </div>
    );
};

export default UserWindow;