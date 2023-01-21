import { IPost } from '../../store/configureStore';
import LikesButton from '../Detail/LikesButton';
import SavedButton from '../Detail/SavedButton';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { detailModalSet } from '../../store/reducers/nav';

interface StatsInterface {
    post: IPost
}


const Stats = ({post} : StatsInterface) => {
    const dispatch = useDispatch();
    const openDetailModal = () => {
        dispatch(detailModalSet(post._id));
    }
    return (
        <div className="row row-cols-3 text-secondary">
            <LikesButton post={post}/>
            <SavedButton post={post}/>
            <div className='col'>
            <Link className="text-decoration-none text-dark d-flex mt-2" to='' onClick={openDetailModal} >
                {'Comments'}
            </Link>
            </div>
        </div>
    )
}

export default Stats;