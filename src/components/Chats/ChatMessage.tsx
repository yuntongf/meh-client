import { IMessage, IUser } from "../../store/configureStore";

interface ChatMessageProps {
    message: IMessage,
    users: IUser[]
}

const ChatMessage = ({message, users}: ChatMessageProps) => {
    // we need profile picture to display before chat message
    const [user] = users.filter(u => u._id === message.sender);
    return (
        <>  
            {user && 
            <div className='d-flex pt-3' >
                <img className="me-3" src={user.pic} style={{width: 50}}/>
                <div className='d-flex' style={{boxShadow: '2px 1px 4px 2px rgba(237, 231, 225, .8)'}}>
                    <div className="m-3" style={{fontSize: 18}}>
                        {message.content}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ChatMessage;