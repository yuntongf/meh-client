import { IComment } from '../../store/configureStore';
import UserHeader from '../Author/UserHeader';

interface CommentInterface {
    comment: IComment
}

const Comment = ({comment} : CommentInterface) => {
    return (
        <div>
            <li key={comment._id.toString()} className="col-12 list-group-item list-group-item-action">
                <UserHeader user_id={comment.author}/>
                    <div className='mb-4 ps-5 mt-2 ms-5' style={{fontSize: 22}}>
                        {comment.content}
                    </div>
                {/* <LikesButton post={comment}/> */}
            </li>
        </div>
    )
}

export default Comment;