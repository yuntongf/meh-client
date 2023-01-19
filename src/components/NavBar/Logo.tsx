import { Link } from "react-router-dom";
import { checkOutPageSet, frontPageReturned } from '../../store/reducers/nav';
import { useDispatch} from 'react-redux';

const Logo = () => {
    const dispatch = useDispatch();
    const logo = "Meh";

    const returnToFrontPage = () => {
        dispatch(frontPageReturned(null));
        dispatch(checkOutPageSet(false));
    }

    return (
        <Link to="/home">
            <label onClick={returnToFrontPage}>
                <h2 className="m-2">
                    {logo} 
                </h2>
            </label>
        </Link>
    )
}

export default Logo;