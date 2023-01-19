import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        userLoggedIn: (auth, action) => {
            auth.loggedIn = true;
            auth.user = action.payload;
        },
        userLoggedOut: (auth, action) => {
            auth.loggedIn = false;
            auth.user = "";
        }
    }
});

export const {
    userLoggedIn,
    userLoggedOut
} = slice.actions;
export default slice.reducer;