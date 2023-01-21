
import { useState } from "react";
import { toastSuccess, toastWarn } from "../../services/NotificationServices";
import auth from '../../services/AuthServices'
import { useNavigate } from "react-router-dom"
import { getUser } from "../../services/UserServices";

const LoginForm = () => {
  const navigate = useNavigate();
  // local state control variables that has the most recent user edits
  const initialState = {
    handle: "", 
    password: ""
  };
  const [data, setData] = useState(initialState);

  const getFirstName = () => {
    const {username} = getUser();
    const [firstname] = username.split(' ');
    return firstname;
  }
  
  const handleLogin = async () => {
    try {
      await auth.login(data.handle, data.password);
      toastSuccess(`🦄 You are all set, ${getFirstName()}!`);
      navigate('/home');
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        toastWarn('Invalid username or password');
      }
    }
  };
  return (
      <div className="col-2">
        <h3>Log In</h3>
        <div>
            <div className="mt-3">handle </div>
            <input 
              type='text' 
              className="col-12"
              onChange={(e) => setData({handle: e.target.value, password: data.password})}/>
            <div className="mt-3">password</div>
            <input 
              type='password' 
              className="col-12"
              onChange={(e) => setData({handle: data.handle, password: e.target.value})}/>
            <div>
                <button className="btn btn-primary mt-4 col-12" onClick={handleLogin}>log in</button>
            </div>
        </div>
      </div>
  )
}

export default LoginForm;