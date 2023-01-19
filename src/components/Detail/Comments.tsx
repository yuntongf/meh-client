
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Comment from './Comment';
import { searchResult } from '../../styles/SearchResultStyles';
import { RootState, IComment } from '../../store/configureStore';
import user from '../../data/user';
import UserHeader from '../Author/UserHeader';
import { toastSuccess, toastWarn } from '../../services/NotificationServices';
import { commentAdded } from '../../store/reducers/courses';
import { ObjectId } from 'bson';
import { postComment } from '../../services/ComposeServices';
import { getUser } from '../../services/UserServices';

interface CommentsProps {
    postId: ObjectId
}

const Comments = ({postId} : CommentsProps) => {
  const dispatch = useDispatch();
  const userId = useSelector((store : RootState) => store.auth.user._id);
  const user = getUser();
  console.log("current user is", user._id);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentSent, setCommentSent] = useState(false);
  

  const handleTrash = () => {
    setComment("");
  } 

  useEffect(() => {
    fetch(`http://localhost:3001/api/post/comments/${postId}`)
      .then(res => res.json())
      .then(function (comments) {
          setComments(comments);
      })
  }, []);

  const handleReMeh = async () => {
      if (!comment) toastWarn('Comment cannot be empty!');
      else {
          const commentButton = document.getElementById('comment-button') as HTMLElement;
          commentButton.innerHTML = (parseInt(commentButton.innerHTML) + 1).toString();
          toastSuccess('Comment saved!');
          const newComment = await postComment(postId, user._id, comment);
          setComments([...comments, newComment] as any);
          setComment("");
      }
  }

  return (
    <>{comments &&
      <div className="mt-3">
        <h4 className='mb-3'>Comments:</h4>
        <ul className="list-group" style={searchResult}>
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