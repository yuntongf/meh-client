
import posts from './posts';

export default {
    "_id": "id1",
    "pic": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png", 
    // "followed": false,
    "handle": "agosto",
    "username": "august",
    "password": "Tongtong816",
    "status": "travel",
    "liked": ["id1", "id2"],
    "saved": ["id2"],
    "notifications": [
        {
            "chat_id": "chatid1",
            "sender_username": "sender username",
            "receiver_username": "sender username",
        }
    ],
    "chats": ["chatid1", "chatid2"],
    "posts": posts,
    "followed": false
}