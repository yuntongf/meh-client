import { TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';
import { navButtonOn, navButtonOff } from '../../styles/NavStyles';
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from '../../store/configureStore';
import { RootState } from '../../store/configureStore';
import { logout } from '../../services/AuthServices';
import { userLoggedOut } from '../../store/reducers/auth';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const StateControl = () => {
    
    const onCheckoutPage = useSelector((store : RootState) => store.nav.onCheckoutPage);
    const user = useSelector((store : RootState) => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        dispatch(userLoggedOut(null));
        navigate('/login');
    }

    return (
        <div>
            {!!user ?
                <button className="m-2 btn btn-outline-secondary" onClick={handleLogOut}> 
                    Log Out
                </button>
            :
            <>
                <Link to='/register'>
                    <button className="m-2 btn btn-outline-secondary" > 
                        Register
                    </button>
                </Link> 
                <Link to='/login'>
                    <button className="m-2 btn btn-outline-secondary" > 
                        Log In
                    </button>
                </Link> 
            </>}

            {onCheckoutPage &&
                <Link to='/'>
                    <button style={navButtonOn} 
                            className='m-2 btn btn-outline-secondary'>
                        Back
                    </button>
                </Link>}
      </div>
    )
}

export default StateControl;