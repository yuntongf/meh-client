
import { useState } from "react";
import { toastSuccess, toastWarn } from "../../services/NotificationServices";
import auth from '../../services/AuthServices'
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const navigate = useNavigate();
    const initialState = {
        handle: "", 
        password: ""
      };

    const [data, setData] = useState(initialState);
    
    const handleLogin = async () => {
        try {
          await auth.login(data.handle, data.password);
          toastSuccess('🦄 You are all set!');
          navigate('/home');
        } catch (ex: any) {
          if (ex.response && ex.response.status === 400) {
            toastWarn('Invalid username or password');
          }
        }
      };
    return (
        <div>
        <h4>Log In</h4>
        <div>
            <div className="mt-3">handle </div>
            <input type='text' onChange={(e) => setData({handle: e.target.value, password: data.password})}/>
            <div className="mt-3">password</div>
            <input type='password' onChange={(e) => setData({handle: data.handle, password: e.target.value})}/>
            <div>
                <button className="btn btn-sm" onClick={handleLogin}>login</button>
            </div>
        </div>
        </div>
    )
}

export default LoginForm;