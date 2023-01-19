import axios from "axios";
import { toast } from "react-toastify";

//axios.defaults.headers.common['x-token'] = localStorage.getItem("token");
axios.defaults.baseURL = "http://localhost:3001";

axios.interceptors.response.use(null, (e) => {
  const expectedError =
    e.response && e.response.status >= 400 && e.response.status < 500;
  if (!expectedError) {
    console.log("logging the error", e);
    toast.error("an unexpected error occured...");
  }
  return Promise.reject(e);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};