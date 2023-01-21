import { IPost } from '../../store/configureStore';
import Tags from '../Detail/Tags';
import Stats from './Stats';
import { Link, useParams } from 'react-router-dom';
import UserHeader from '../Author/UserHeader';
import { useDispatch } from 'react-redux';
import { detailModalSet } from '../../store/reducers/nav';

const contentStyle = {fontSize:22};
const postStyle = {boxShadow: '1px 1px 3px 1px rgba(237, 231, 225, .8)'};

interface PostInterface {
    post: IPost
}

const Post = ({post} : PostInterface) => {
    const dispatch = useDispatch();

    const openDetailModal = () => {
        dispatch(detailModalSet(post._id));
    }

    return (
        <div className="card mb-3 p-4" key={post._id.toString()} style={postStyle}>
            {post &&
                <div >
                    <UserHeader user_id={post.author}/>
                    <Link className="text-decoration-none text-dark" to="" onClick={openDetailModal}>
                        <div className="ms-5 ps-5 mb-5" >
                            <p style={contentStyle}>
                            {post.content}
                            </p>
                            <small>click to view detail</small>
                        </div>
                    </Link>       
                    <div className='mt-3 mb-2'>
                        <Stats post={post} />
                    </div>
                    <div>
                        <Tags tags={post.tags}/>
                    </div>
                </div>}
            </div>
    )
}

export default Post;