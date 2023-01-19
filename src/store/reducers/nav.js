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
        }
    }
    
})

export const {
    messageTriggered,
    modalSet
} = slice.actions;
export default slice.reducer;
