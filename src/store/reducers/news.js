import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'news',
    initialState: {},
    reducers: {
        loadNews : (news, action) => {
            news.articles = action.payload;
        }
    }
    
})

export const {
    loadNews
} = slice.actions;
export default slice.reducer;
