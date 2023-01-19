import http from "./HttpServices";
//const apiEndpoint = "http://localhost:3000";

export async function login(handle, password) {
   const { data: jwt } = await http.post("/api/login", {handle, password});
   localStorage.setItem("token", jwt);
   return;
}

export function getJwt() {
   return localStorage.getItem("token");
}

export function logout() {
   localStorage.setItem("token", "");
}

export default {
   login,
   logout,
   getJwt
}

