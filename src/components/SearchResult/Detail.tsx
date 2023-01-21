import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/configureStore";
import Comments from "../Detail/Comments";
import { loadPost } from "../../store/reducers/posts";
import Post from "./Post";
import { baseURL } from '../../services/HttpServices';

const Detail = () => {
   const dispatch = useDispatch();
   const post = useSelector((store : RootState) => store.entities.post);
   const postId = useSelector((store : RootState) => store.nav.detailModalPost);

   useEffect(() => {
      fetch(`${baseURL}/api/post/${postId}`)
        .then(res => res.json())
        .then(function (post) {
            dispatch(loadPost(post));
        })
    }, []);
    
    
   return (
      <div> 
         {post &&
         <div>
            <Post post={post}/>
            <Comments postId={post._id}/>
         </div>}
      </div>
   )
}

export default Detail;