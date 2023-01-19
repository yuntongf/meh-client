import { ObjectId } from "bson";
import http from "./HttpServices";

export async function getChats(userId) {
    return http.post('/api/chat', {userId});
}

export async function chat(senderId, receiverId) {
    return http.post('/api/chat/messages', {senderId, receiverId});
}

export async function send(chatId, senderId, content) {
    const {data: chat} = await http.post('/api/chat/send', {chatId, senderId, content});
    return chat;
}

export async function getUsers(users) {
    const {data} = await http.post('/api/chat/profiles', {users});
    return data;
}