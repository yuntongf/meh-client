import {combineReducers} from 'redux';
import entitiesReducer from './reducers/posts';
import navReducer from './reducers/nav';
import authReducer from './reducers/auth';
import newsReducer from './reducers/news';

export default combineReducers({
    entities: entitiesReducer,
    nav:navReducer,
    auth: authReducer,
    news: newsReducer
});