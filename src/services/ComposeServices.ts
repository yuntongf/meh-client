import { ObjectId } from "bson";
import http from "./HttpServices";



export async function post(author: ObjectId, content: string, tags: string[]) {
    const { data: jwt } = await http.post("/api/post", {author, content, tags});
    //localStorage.setItem("token", jwt);
    return;
 }



export async function postComment(post: ObjectId, author: ObjectId, comment: string) {
    const {data: ret} = await http.post(`/api/post/comment/${post}`, {post, author, comment});
    //localStorage.setItem("token", jwt);
    return ret;
 }