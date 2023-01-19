
import { useContext } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const RegisterPage = () => {
   return (
   <div className="d-flex justify-content-center mt-5">
      <RegisterForm />
   </div>);
}

export default RegisterPage;