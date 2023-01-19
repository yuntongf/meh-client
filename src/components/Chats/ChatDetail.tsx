import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "../../services/MessageServices";
import { IChat, RootState } from "../../store/configureStore";
import MessageTypeArea from "../Compose/MessageTypeArea";
import ChatMessage from "./ChatMessage";

const ChatDetail = () => {
    
    const chat = useSelector((store : RootState) => store.entities.chat);
    console.log("chat detail chat", chat);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (chat) {
            getUsers(chat.users)
            .then((users) => setUsers(users))
        }
    }, [chat]);

    return (
        <div className="list-group">
            {chat && users &&
            <div>
                <div className="list-group-item" style={{height: 510, maxHeight: 500, overflow: 'auto'}}>
                    {chat.messages ? 
                    <ul className="">
                        {chat.messages.map(message => (
                            <ChatMessage message={message} users={users}/>
                        ))}
                    </ul>
                    :
                    <div className='d-flex justify-content-center'>
                        <div style={{fontSize:18}}>
                            No messages between you at the moment!
                        </div>
                    </div>
                    }
                </div>
                <div>
                    <MessageTypeArea chat_id={chat._id}/>
                </div>
            </div>}
        </div>
    );
}

export default ChatDetail;