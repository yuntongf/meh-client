
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Post from './Post';
import { RootState, IPost } from '../../store/configureStore';
import { loadLiked, loadPosts, loadSaved } from '../../store/reducers/courses';
import { getUser } from '../../services/UserServices';
import { baseURL } from '../../services/HttpServices';

const Posts = () => {

  //const posts = useSelector((store : RootState) => store.entities.posts);
  const posts = useSelector((store : RootState) => store.entities.posts);
  const dispatch = useDispatch();
  const user = getUser();
  console.log("posts", posts);

  useEffect(() => {
    fetch(`${baseURL}/api/user/liked/${user._id.toString()}`)
    .then(res => res.json())
    .then(function (liked) {
      console.log(liked);
      dispatch(loadLiked(liked));
      // dispatch(loadLiked(liked));
    })
}, [])

useEffect(() => {
  fetch(`${baseURL}/api/user/saved/${user._id.toString()}`)
  .then(res => res.json())
  .then(function (saved) {
    dispatch(loadSaved(saved));
  })
}, [])

useEffect(() => {
  dispatch(loadPosts(posts))
}, [posts]);

  return (
      <div>
      {posts[0] ?
        <ul className="list-group" >
          {posts.map((post : IPost) => (
            <Post post={post}/>
          ))}
        </ul> 
        :
        <div className='d-flex justify-content-center'>
          <div style={{fontSize:18}}>
            No posts at the moment!
          </div>
        </div>}
      </div>
    
    )
}

export default Posts;