
import {createSlice} from '@reduxjs/toolkit';

/*
store: 
{
    courses: [array of search results],  // array of course objects
    current: course currently being viewed // an course obejct
    cart: [courses in cart], // array of course objects
}

*/

const slice = createSlice({
    name: 'entities',
    initialState: {},
    reducers: {
        // initialize courses, cart, fourYears, carts, notes, and showCart
        loadPosts: (store, action) => {
            store.posts = action.payload;
            store.followed = store.followed || ['Twitter'];
            store.liked = store.liked || [];
            store.saved = store.saved || [];
            //store.profile = store.profile || {};
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
        chatIdSet: (entities, action) => {
            entities.chatId = action.payload;
        },
        userFollowed: (store, action) => {
            const userFollowed = action.payload;
            const postsByUserFollowed = store.posts.filter(p => p.author._id === userFollowed._id);
            postsByUserFollowed.forEach(post => {
                post.author.followed = true;
            });
            // or keep track of an array of followed users 
        },
        postLiked: (entities, action) => {
            const [post] = entities.posts.filter(p => p._id === action.payload._id);
            // if already liked then undo like, else add to the liked list
            const [liked] = entities.liked.filter(l => l === action.payload._id);
            console.log(JSON.stringify(liked));
            if (liked) {
                // liked array
                entities.liked = entities.liked.filter(l => l !== action.payload._id);
                //post.liked--;
            }
            else {
                entities.liked = [...entities.liked, action.payload._id];
                //post.liked++;
                console.log(JSON.stringify(entities.liked))
            }
        },
        postSaved: (entities, action) => {
            // if already liked then undo like, else add to the liked list
            const [saved] = entities.saved.filter(l => l === action.payload._id);
            if (saved) {
                // liked array
                entities.saved = entities.saved.filter(l => l !== action.payload._id);
            }
            else {
                entities.saved = [...entities.saved, action.payload._id];
            }
        },
        loadPost: (entities, action) => {
            entities.post = action.payload;
        },
        loadProfile: (entities, action) => {
            entities.profile = action.payload;
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
