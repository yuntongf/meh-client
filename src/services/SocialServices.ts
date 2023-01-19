import { ObjectId } from "bson";
import http from "./HttpServices";



export async function follow(followerId: ObjectId, followingId: ObjectId) {
    await http.post("/api/follow", {followerId, followingId});
    return;
 }

 export async function unfollow(followerId: ObjectId, followingId: ObjectId) {
    await http.post("/api/unfollow", {followerId, followingId});
    return;
 }

 export async function like(postId: ObjectId, likes: Number, user: ObjectId) {
   const like = await http.post(`/api/post/like/${postId}`, {likes, user});  
   return like;
}

export async function unlike(postId: ObjectId, likes: Number, user: ObjectId) {
   const like = await http.post(`/api/post/unlike/${postId}`, {likes, user});  
   return like;
}

export async function save(postId: ObjectId, saves: Number, user: ObjectId) {
   const like = await http.post(`/api/post/save/${postId}`, {saves, user});  
   return like;
}

export async function unsave(postId: ObjectId, saves: Number, user: ObjectId) {
   const like = await http.post(`/api/post/unsave/${postId}`, {saves, user});  
   return like;
}

// export async function gotFollowings

