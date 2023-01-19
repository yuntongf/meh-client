import {useDispatch} from 'react-redux';
import { userLoggedIn} from '../../store/reducers/auth';
import UserHeader from '../Author/UserHeader';
import MessageButton from './MessageButton';
import { ObjectId } from 'bson';

interface FollowInterface {
    follow: ObjectId
}

const Follow = ({follow} : FollowInterface) => {
    const dispatch = useDispatch();

    const handleDetail = (follow : ObjectId) => {
        dispatch(userLoggedIn(follow));
    }

    return (
        <div className="" onClick={() => handleDetail(follow)}>
            <li key={follow.toString()} className="col-12 bg-light font-weight-bolder list-group-item p-3 flex-column align-items-start">
                <div className='d-flex justify-content-between'>
                    <UserHeader user_id={follow}/>
                    <MessageButton userId={follow} />
                </div>
            </li>
        </div>
    )
}

export default Follow;