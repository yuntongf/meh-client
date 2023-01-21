import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'nav',
    initialState: {},
    reducers: {
        modalSet : (nav, action) => {
            nav.modalOpen = action.payload;
        },
        messageTriggered: (nav, action) => {
            nav.messaging = !nav.messaging;
        },
        detailModalSet: (nav, action) => {
            nav.detailModalPost = action.payload;
        }
    }
    
})

export const {
    messageTriggered,
    modalSet,
    detailModalSet
} = slice.actions;
export default slice.reducer;
