
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import Comment from './Comment';
import { RootState, IComment } from '../../store/configureStore';
import UserHeader from '../Author/UserHeader';
import { toastSuccess, toastWarn } from '../../services/NotificationServices';
import { ObjectId } from 'bson';
import { postComment } from '../../services/ComposeServices';
import { getUser } from '../../services/UserServices';
import { baseURL } from '../../services/HttpServices';

interface CommentsProps {
    postId: ObjectId
}

const Comments = ({postId} : CommentsProps) => {
  const userId = useSelector((store : RootState) => store.auth.user._id);
  const user = getUser();

  // local state variables to hold existing comments and user comment in draft
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleTrash = () => {
    setComment("");
  } 

  // fetch comments from database using postId
  useEffect(() => {
    fetch(`${baseURL}/api/post/comments/${postId}`)
      .then(res => res.json())
      .then(function (comments) {
          setComments(comments);
      })
  }, []);

  const handleReMeh = async () => {
      if (!comment) toastWarn('Comment cannot be empty!');
      else {
          // update comment numbers by manipulating the dom tree
          const commentButton = document.getElementById('comment-button') as HTMLElement;
          commentButton.innerHTML = (parseInt(commentButton.innerHTML) + 1).toString();
          
          toastSuccess('Comment saved!');

          // add created comment (from the server) to the client side local comments
          const newComment = await postComment(postId, user._id, comment);
          setComments([...comments, newComment] as any);
          setComment(""); // restore text field to empty
      }
  }

  return (
    <>{comments &&
      <div className="mt-3">
        <h4 className='mb-3'>Comments:</h4>
        <ul className="list-group">
          {comments.map((comment : IComment) => (
            <Comment comment={comment}/>
          ))}
        </ul>
          <div key="" className="col-12 bg-light font-weight-bolder list-group-item list-group-item-action p-3 flex-column align-items-start">
                <UserHeader user_id={userId}/>
                <div className="mt-4">
                    <textarea name='note' className='form-control' placeholder='Re: Meh!' value={comment} onChange={e => setComment(e.currentTarget.value)} rows={3} />
                </div>
                <div className='d-flex justify-content-end mt-3'>
                    {comment && <button onClick={() => handleTrash()} className="btn btn-sm btn-outline-warning" > 🗑 </button>}
                    <button onClick={handleReMeh} className="btn btn-primary" > Meh </button>
                </div>
            </div>
      </div>}
    </>
    
    )
}

export default Comments;