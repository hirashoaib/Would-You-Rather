import { RECEIVE_QUESTIONS, SAVE_QUESTION_INTO_DATA, SAVE_ANSWER_INTO_DATA } from '../actions/questions';


export default function questions (state = {}, action) {
    switch(action.type){
        case RECEIVE_QUESTIONS : 
            return {
                ...state,
                ...action.questions
            }
        case SAVE_QUESTION_INTO_DATA:
            const { question } = action;
            return {
                ...state,
                [question.id] : question,
            }
        case SAVE_ANSWER_INTO_DATA:
            const { answer } = action;
            return {
                ...state,
                [answer.qid] : {
                    ...state[answer.qid],
                    [answer.answer] : {
                        ...state[answer.qid][answer.answer],
                        votes : state[answer.qid][answer.answer].votes.concat([answer.authedUser])
                    }
                }
            }
        default :
            return state;
    }
}