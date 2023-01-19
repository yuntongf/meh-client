import { IPost } from '../../store/configureStore';
import Tags from '../Detail/Tags';
import Stats from './Stats';
import { Link } from 'react-router-dom';
import UserHeader from '../Author/UserHeader';

interface PostInterface {
    post: IPost
}

const Post = ({post} : PostInterface) => {

    return (
        <div className="card mb-3 p-4">
            {post &&
                <div key={post._id.toString()} >
                    <UserHeader user_id={post.author}/>
                    <Link className="text-decoration-none text-dark" to={`/post/${post._id}`} >
                        <div className="ms-5 ps-5 mb-5" >
                            <p style={{fontSize:22}}>
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