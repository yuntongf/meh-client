import React, { useEffect, useState } from "react";
import { descriptionWrapper, detailWrapper } from "../../styles/DetailStyles";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/configureStore";
import Comments from "../Detail/Comments";
import { loadPost } from "../../store/reducers/courses";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { baseURL } from '../../services/HttpServices';

const Detail = () => {
   const dispatch = useDispatch();
   const post = useSelector((store : RootState) => store.entities.post);
   const {id} = useParams();

   useEffect(() => {
      fetch(`${baseURL}/api/post/${id}`)
        .then(res => res.json())
        .then(function (post) {
            dispatch(loadPost(post));
        })
    }, []);
    
    
   return (
      <div className='' style={detailWrapper}> 
      {post &&
         <div>
            <Post post={post}/>
            <Comments postId={post._id}/>
         </div>}
      </div>
   )
}

export default Detail;