import { RECEIVE_USERS, ADD_QUESTION_ID_INTO_USER, ADD_SELECTED_ANSWER_INTO_USER} from '../actions/users';

export default function users (state = {}, action) {
    switch(action.type){
        case RECEIVE_USERS : 
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION_ID_INTO_USER : 
            return {
                ...state,
                [action.authedUser] : {
                    ...state[action.authedUser],
                    questions : state[action.authedUser].questions.concat([action.questionId])
                }
            }
        case ADD_SELECTED_ANSWER_INTO_USER:
            return {
                ...state,
                [action.authedUser] : {
                    ...state[action.authedUser],
                    answers : {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        default :
            return state;
    }
}