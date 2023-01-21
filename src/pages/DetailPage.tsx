
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import '../App.css'
import Detail from '../components/SearchResult/Detail'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { detailModalSet } from '../store/reducers/nav';

export const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      },
    content: {
        top: "5%",
        left: "20%",
        backgroundColor: "white",
        width: '60%',
        height: 750
      },
}

const detailStyle = {width: '93%'};

const DetailPage = () => {
    // modal id from the redux store
    const detailModalPostId = useSelector((store : RootState) => store.nav.detailModalPost);
    const dispatch = useDispatch();

    const handleModalClose = () => {
        dispatch(detailModalSet(""));
    }
   return (
        <Modal isOpen={!!detailModalPostId} 
            style={modalStyle} 
            ariaHideApp={false}
            onRequestClose={handleModalClose}>
            <div className="d-flex justify-content-center">
                <div style={detailStyle} className='p-3'>
                    <Detail/>
                </div>
            </div>
        </Modal>
   );
}

export default DetailPage;