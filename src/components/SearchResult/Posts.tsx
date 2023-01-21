
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Post from './Post';
import { RootState, IPost } from '../../store/configureStore';
import { loadLiked, loadPosts, loadSaved } from '../../store/reducers/posts';
import { getUser } from '../../services/UserServices';
import { baseURL } from '../../services/HttpServices';
import DetailPage from '../../pages/DetailPage';

const noPostPromptStyle = {fontSize:18};

const Posts = () => {
  const posts = useSelector((store : RootState) => store.entities.posts);
  const dispatch = useDispatch();
  const user = getUser();

  // populate the redux store with liked and saved posts
  useEffect(() => {
    fetch(`${baseURL}/api/user/liked/${user._id.toString()}`)
    .then(res => res.json())
    .then(function (liked) {
      dispatch(loadLiked(liked));
    })
}, []);

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
      {posts[0] ? // loop through all posts
      <div>
        <DetailPage/>
        <ul className="list-group pe-5 pb-5" >
          {posts.map((post : IPost) => (
            <Post post={post}/>
          ))}
        </ul> 
        </div>
        :
        <div className='d-flex justify-content-center'>
          <div style={noPostPromptStyle}>
            No posts at the moment!
          </div>
        </div>}
      </div>
    
    )
}

export default Posts;