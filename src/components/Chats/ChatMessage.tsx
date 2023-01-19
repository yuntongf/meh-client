import { Link } from "react-router-dom";
import { IMessage, IUser } from "../../store/configureStore";
import SmallUserHeader from "../Author/SmallUserHeader";
import UserHeader from "../Author/UserHeader";

interface ChatMessageProps {
    message: IMessage,
    users: IUser[]
}

const ChatMessage = ({message, users}: ChatMessageProps) => {
    console.log(users);
    console.log(message.sender);
    const [user] = users.filter(u => u._id === message.sender);
    console.log("user is ", user);
    return (
        <>  
            {user && 
            <div className='d-flex pt-3' >
                <img className="me-3" src={user.pic} style={{width: 50}}/>
                <div className='d-flex' style={{boxShadow: '2px 1px 4px 2px rgba(237, 231, 225, .8)'}}>
                    <div>
                        {/* <div>
                            {message.sender.handle}
                        </div> */}
                    </div>
                    <div className="m-3" style={{fontSize: 18}}>
                        {message.content}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ChatMessage;