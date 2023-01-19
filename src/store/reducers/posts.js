
import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'entities',
    initialState: {},
    reducers: {
        loadPosts: (store, action) => {
            // initialize posts, followed, liked and saved 
            store.posts = action.payload;
            store.followed = store.followed || ['Twitter'];
            store.liked = store.liked || [];
            store.saved = store.saved || [];
        },
        loadLiked: (entities, action) => {
            entities.liked = action.payload;
        },
        loadFollowing: (entities, action) => {
            entities.following = action.payload;
        },
        loadSaved: (entities, action) => {
            entities.saved = action.payload;
        },
        loadPost: (entities, action) => {
            entities.post = action.payload;
        },
        loadProfile: (entities, action) => {
            entities.profile = action.payload;
        },
        chatIdSet: (entities, action) => {
            entities.chatId = action.payload;
        },
        userFollowed: (store, action) => {
            const userFollowed = action.payload;
            const postsByUserFollowed = store.posts.filter(p => p.author._id === userFollowed._id);
            postsByUserFollowed.forEach(post => {
                post.author.followed = true;
            });
        },
        postLiked: (entities, action) => {
            const [post] = entities.posts.filter(p => p._id === action.payload._id);
            /* the number of likes to be set is larger than the current number,
             that means the user liked the post, thereby increasing its likes, vice versa*/
            if (action.payload.likes > post.likes) {
                entities.liked = [...entities.liked, post._id];
            } else {
                entities.Liked = entities.liked.filter(l => l !== post._id)
            }
            post.likes = action.payload.likes;
        },
        postSaved: (entities, action) => {
            // similar to like
            const [post] = entities.posts.filter(p => p._id === action.payload._id);
            if (action.payload.saves > post.saved) {
                entities.saved = [...entities.saved, post._id];
            } else {
                entities.saved = entities.saved.filter(s => s !== post._id)
            }
            post.saved = action.payload.saves;
        },
        profileEdited: (entities, action) => { 
            entities.profile.username = action.payload.username;
            entities.profile.handle = action.payload.handle;
            entities.profile.status = action.payload.status;
        },
        commentAdded: (entities, action) => {
            entities.post.comments = [...entities.post.comments, action.payload];
        },
        chatSet: (store, action) => {
            store.chat = action.payload;
        },
        userSet: (store, action) => {
            store.user = action.payload;
        }
    }
})

export const {
    loadProfile,
    loadLiked,
    loadSaved,
    loadFollowing,
    profileEdited,
    loadPost,
    chatIdSet,
    commentAdded,
    userFollowed,
    postLiked,
    postSaved,
    userSet,
    loadPosts,
    chatSet} = slice.actions;
export default slice.reducer;
