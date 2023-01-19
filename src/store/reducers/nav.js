import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'nav',
    initialState: {},
    reducers: {
        mehSet : (nav, action) => {
            nav.meh = action.payload;
        },
        messageTriggered: (nav, action) => {
            nav.messaging = !nav.messaging;
        },
        showFourYearPlanSet: (nav, action) => {
            nav.showFourYearPlan = !nav.showFourYearPlan;
            if (nav.showFourYearPlan) {
                nav.showCart = true;
                nav.onContentPage = true;
                nav.hideSearchBar = true;
            } else {
                nav.hideSearchBar = false;
            }
            console.log(action.payload);
            if (!action.payload) { 
                nav.onContentPage = false;
            }
        },
        searchBarSet: (nav, action) => {
            nav.hideSearchBar = !nav.hideSearchBar;
        },
        showCartSet: (nav, action) => {
            nav.showCart = !nav.showCart;
        },
        onContentPageSet: (nav, action) => {
            nav.onContentPage = action.payload;
        },
        showFourYearPlanReset: (nav, action) => {
            nav.showFourYearPlan = false;
            nav.hideSearchBar = false;
        },
        frontPageReturned: (nav, action) => {
            nav.onContentPage = false;
            nav.showFourYearPlan = false;
            nav.hideSearchBar = false;
        },
        checkOutPageSet: (nav, action) => {
            nav.onCheckoutPage = action.payload;
        }
    }
    
})

export const {
    messageTriggered,
    mehSet,
    showFourYearPlanSet, 
    onContentPageSet, 
    showCartSet, 
    showFourYearPlanReset, 
    searchBarSet, 
    checkOutPageSet,
    frontPageReturned} = slice.actions;
export default slice.reducer;
