import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { RootState } from '../store/configureStore';
import { mehSet, messageTriggered } from '../store/reducers/nav';
import Modal from 'react-modal';
import UserHeader from './Author/UserHeader';
import ChatDetail from './Chats/ChatDetail';
import { ObjectId } from 'bson';

const MessageWindow = () => {
    const messaging = useSelector((store : RootState) => store.nav.messaging);
    const chatId = useSelector((store : RootState) => store.entities.chatId);

    useEffect(() => {
        console.log(chatId);
        
    }, [chatId])
    
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
            height: 780
          },
    }
    const dispatch = useDispatch();

    const handleCloseModal = () => {
       dispatch(messageTriggered(null));
    }

    return (
        <Modal isOpen={messaging} style={modalStyle} onRequestClose={handleCloseModal}>
            <UserHeader user_id={new ObjectId(chatId)}/>
            <ChatDetail/>
        </Modal>
    );
}

export default MessageWindow;