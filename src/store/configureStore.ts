
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer';
import { ObjectId } from "bson";

export const store = configureStore({reducer: reducer});

export interface IYear {
    name: string,
    semesters: ISemester[]
}

export interface ISemester {
    name: string,
    courses: ICourse[]
}

export interface ICourse {
    id: string,
    title: string,
    description: string,
    semester: string,
    num_sections: number,
    course_quality: number,
    instructor_quality: number,
    difficulty: number,
    work_required: number,
    recommendation_score: number,
    added: boolean,
    dept: string,
    number: string,
    note: string
}

export interface ITag {
    _id: ObjectId,
    tag: string
}

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
    saved: number,
    remehs: number,
    time: Date
}

export interface ICart {
    name: string,
    courses: ICourse[]
}

export interface RootState {
    entities: {
        profile: IProfile,
        courses: ICourse[],
        current: ICourse,
        cart: ICart,
        carts: ICart[],
        fourYears: IYear[],
        posts: IPost[],
        chat: IChat,
        user: IUser,
        following: ObjectId[],
        liked: ObjectId[],
        saved: ObjectId[],
        post: IPost,
        chatId: ObjectId
    },
    search: {
        queryString: string,
        filterString: string,
        showFilter: boolean,
        filters: {
            difficulty: number[],
            quality: number[],
            instructorQuality: number[]
        },
        loaded: boolean
    }
    nav: {
        showFourYearPlan: boolean,
        showCart: boolean,
        hideSearchBar: boolean,
        onContentPage: boolean,
        onCheckoutPage: boolean,
        meh: boolean,
        messaging: boolean,
        messageTo: ObjectId
    },
    auth: {
        user: IUser,
        loggedIn: boolean
    }
  }

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch