import { ObjectId } from "bson";
import jwtDecode from "jwt-decode";
import { getJwt } from "./AuthServices";
import http from "./HttpServices";
import { IUser } from "../store/configureStore";

interface RegisterArgs {
  username: string, 
  handle: string, 
  status: string,
  password: string
}

export async function register(user: RegisterArgs, pic: string) {
    const profile = {...user, pic};
   const res = await http.post("/api/register", profile);
   localStorage.setItem("token", res.headers['x-token']);
   return;
}

export function getUser() : IUser {
  const jwt = getJwt();
  return jwtDecode(jwt as any);
}

export function getUserHelper(userId: ObjectId) {
    return http.get(`http://localhost:3001/api/user/${userId}`);
  }

export async function edit(userId: ObjectId, username: String, handle: String, status: String) {
    const res = await http.post("http://localhost:3001/api/profile/edit", {userId, username, handle, status});
    localStorage.setItem("token", res.headers['x-token']);
    return getUser();
 }