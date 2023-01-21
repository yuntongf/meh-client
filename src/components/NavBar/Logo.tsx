import { Link } from "react-router-dom";
import { getJwt } from "../../services/AuthServices";

const Logo = () => {
    const logo = "Meh ~";
    const redirectUrl = getJwt() ? '/home' : '/login';

    return (
        <Link to={redirectUrl}>
            <label>
                <h1 className="m-2 ms-3">
                    {logo} 
                </h1>
            </label>
        </Link>
    )
}

export default Logo;