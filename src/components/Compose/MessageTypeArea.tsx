import {chatSet} from '../../store/reducers/courses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { toastSuccess, toastWarn } from '../../services/NotificationServices';
import { RootState } from '../../store/configureStore';
import { getUser } from '../../services/UserServices';
import { send } from '../../services/MessageServices';
import { ObjectId } from 'bson';

//const socket = io();
interface MessageTypeAreaProps {
    chat_id: ObjectId
}

const MessageTypeArea = ({chat_id} : MessageTypeAreaProps) => {
    const meh = useSelector((store : RootState) => store.nav.meh);
    const user = getUser();
    const chatId = useSelector((store : RootState) => store.entities.chatId);
    const [note, setNote] = useState("");
    const dispatch = useDispatch();

    const handleTrash = () => {
        setNote("");
    }

    const handleMeh = async () => {
        if (!note) toastWarn('Message cannot be empty!');
        else {
            const data = await send(chat_id, user._id, note);
            dispatch(chatSet(data));
        }
    }

    return (
            <div className="">
                <div className="">
                    <textarea name='note' className='form-control' placeholder='Meh!' value={note} onChange={e => setNote(e.currentTarget.value)} rows={3} />
                </div>
                    <div className='d-flex justify-content-end'>
                        {note && <button onClick={() => handleTrash()} className="btn btn-sm btn-outline-warning" > 🗑 </button>}
                        <button onClick={handleMeh} className="btn btn-primary" > Meh </button>
                    </div>
            </div>
    );
}

export default MessageTypeArea;