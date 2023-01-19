import { ObjectId } from "bson";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../services/UserServices";
import {chat} from "../../services/MessageServices";
import { IUser } from "../../store/configureStore";
import { messageTriggered } from "../../store/reducers/nav";
import { chatIdSet, chatSet } from "../../store/reducers/courses";

interface MessageButtonProps {
    userId: ObjectId
}
const MessageButton = ({userId}: MessageButtonProps) => {
    const dispatch = useDispatch();
    const user = getUser();

    const handleMessage = async () => {
        dispatch(chatIdSet(userId));
        dispatch(messageTriggered(null));
        const {data} = await chat(user, userId);
        console.log("chat", data);
        dispatch(chatSet(data));
    }
    return (
        <Link to={``}>
            <button className="btn btn-sm btn-secondary mt-4" onClick={handleMessage} style={{height: 40, borderRadius: '30px'}}>
                meh
            </button>
        </Link>
    )
}

export default MessageButton;