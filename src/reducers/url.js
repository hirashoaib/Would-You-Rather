import { SAVE_URL, REMOVE_URL  } from '../actions/url';

export default function saveURL (state = {}, action) {
    switch(action.type){
        case SAVE_URL : 
            return {
                ...state,
                matchObj: action.matchObj,
                redirected: true
            }
        case REMOVE_URL : 
            return {
                ...state,
                matchObj: null,
                redirected: false
            }
        default :
            return state;
    }
}