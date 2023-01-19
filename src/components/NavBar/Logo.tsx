import { Link } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { getJwt } from "../../services/AuthServices";

const Logo = () => {
    const logo = "Meh";
    const redirectUrl = getJwt() ? '/home' : '/login';

    return (
        <Link to={redirectUrl}>
            <label>
                <h2 className="m-2">
                    {logo} 
                </h2>
            </label>
        </Link>
    )
}

export default Logo;