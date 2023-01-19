import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { RootState } from '../store/configureStore';
import { mehSet } from '../store/reducers/nav';
import Modal from 'react-modal';
import UserHeader from './Author/UserHeader';
import ComposeArea from './Compose/ComposeArea';
import { getUser } from '../services/UserServices';

const MehWindow = () => {
    
    //const course = useSelector((store : RootState) => store.entities.current);
    const meh = useSelector((store : RootState) => store.nav.meh);
    const user = getUser();
    let [note, setNote] = useState("");
    
    const modalStyle = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            width: 600,
            height: 500
          },
    }
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(mehSet(false));
    }

    return (
        <Modal isOpen={meh} style={modalStyle} onRequestClose={handleCloseModal}>
            <UserHeader user_id={user._id}/>
            <ComposeArea/>
        </Modal>
    );
}

export default MehWindow;