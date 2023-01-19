import { IPost } from '../../store/configureStore';
import LikesButton from '../Detail/LikesButton';
import SavedButton from '../Detail/SavedButton';
import { Link } from 'react-router-dom';

interface StatsInterface {
    post: IPost
}

const Stats = ({post} : StatsInterface) => {
    
    return (
        <div className="row row-cols-3 text-secondary">
            <LikesButton post={post}/>
            <SavedButton post={post}/>
            <div className='col'>
                <Link className="text-decoration-none text-dark d-flex" to={`/post/${post._id}`} >
                    {'Comments'}
                    <div id="comment-button">
                        {post.comments.length}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Stats;