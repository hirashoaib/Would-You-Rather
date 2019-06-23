import { combineReducers } from 'redux';
import authedUser  from './authedUser';
import users  from './users';
import questions from './questions';
import saveURL from './url';
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
    authedUser,
    users,
    questions,
    saveURL,
    loadingBar: loadingBarReducer,
});