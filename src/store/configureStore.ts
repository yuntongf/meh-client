
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer';
import { ObjectId } from "bson";

export const store = configureStore({reducer: reducer});


/**************** Posts *****************/
export interface ITag {
    _id: ObjectId,
    tag: string
}

/**************** Comments *****************/
export interface IComment {
    _id: ObjectId,
    author: ObjectId,
    content: string,
    likes: number
}
export interface IPost extends IComment{
    _id: ObjectId,
    author: ObjectId,
    content: string,
    comments: IComment[],
    tags: string[],
    likes: number,
    remehs: number,
    time: Date,
    saved: number
}
/**************** Chat *****************/

export interface IMessage {
    _id: ObjectId,
    sender: ObjectId,
    content: string
}

export interface IChat {
    _id: ObjectId,
    users: ObjectId[],
    messages: IMessage[]
}

/**************** User *****************/

export interface IUser {
    _id: ObjectId,
    username: string,
    handle: string,
    status: string,
    pic: string,
    following: boolean
}

export interface IProfile extends IUser {
    _id: ObjectId,
    handle: string,
    username: string,
    status: string,
    pic: string,
    liked: ObjectId[],
    saved: ObjectId[],
    notifications: IMessage[],
    chats: ObjectId[],
    posts: IPost[],
    followed: boolean
}

/**************** News *****************/
export interface IArticle {
    country: string[],
    creator: string[],
    keywords: string[],
    link: string,
    pubDate: string,
    title: string
}

/**************** Root *****************/

export interface RootState {
    entities: {
        profile: IProfile,
        posts: IPost[],
        chat: IChat,
        user: IUser,
        following: ObjectId[],
        liked: ObjectId[],
        saved: ObjectId[],
        post: IPost,
        chatId: ObjectId
    },
    nav: {
        modalOpen: boolean,
        messaging: boolean,
        messageTo: ObjectId,
        detailModalPost: boolean
    },
    auth: {
        user: IUser,
        loggedIn: boolean
    }
    news: {
        articles: IArticle[]
    }
  }

export type AppDispatch = typeof store.dispatch