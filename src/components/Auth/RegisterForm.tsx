
import { useState } from "react";
import { toastSuccess, toastWarn } from "../../services/NotificationServices";

import { useNavigate } from "react-router-dom"
import { register } from "../../services/UserServices";

const defaultProfilePic = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png";

const RegisterForm = () => {
    const navigate = useNavigate();
    const initialState = {
        username: "",
        handle: "", 
        password: "",
        status: ""
      };
    const [data, setData] = useState(initialState);
    const [pic, setPic] = useState(defaultProfilePic);
    
    const generatePic = async () => {
      fetch('https://picsum.photos/70')
      .then(res => setPic(res.url));
    }

    const handleRegister = async () => {
        if (!data.username || 
            !data.handle || // inputs cannot be empty
            !data.password) {
              toastWarn('Field cannot be empty!');
              return;
            }
        try {
          await register(data, pic);
          toastSuccess('🦄 You are all set!');
          navigate('/home');
        } catch (ex: any) {
          if (ex.response && ex.response.status === 401) {
            // we use handle instead of username to uniquely identifies users
            toastWarn('handle already exists!'); 
          } else {
            toastWarn('Something went wrong...');
          }
        }
      };

    return (
        <div>
          <h4>Register for a Meh account!</h4>
          <div>

            <div className="mt-4">Profile picture</div>
            <div>
              <img src={pic} style={{width: 70}}/>
              <button className="ms-3 btn btn-outline-primary" onClick={generatePic}>Generate a new one!</button>
            </div>

            <div className="mt-3">
              username 
              </div>
            <input className="col-12" type='text' onChange={(e) => setData({username: e.target.value, password: data.password, handle: data.handle, status: data.status })}/>
            
            <div className="mt-3">
              handle
            </div>
            <div className="d-flex justify-content-between">
              <span>@</span>
              <input className="col-11" onChange={(e) => setData({username: data.username, password: data.password, handle: e.target.value, status: data.status})}/>
            </div>

            <div className="mt-3">status</div>
            <input className="col-12" onChange={(e) => setData({username: e.target.value, password: data.password, handle: data.handle, status: e.target.value})}/>
            
            <div className="mt-3">password</div>
            <input className="col-12" type='password' onChange={(e) => setData({username: e.target.value, password: e.target.value, handle: data.handle, status: data.status})}/>
            
            <div className="d-flex justify-content-start">
                <button className="btn mt-5 btn-primary col-5" onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
    )
}

export default RegisterForm;