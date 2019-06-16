import { saveQuestion, saveQuestionAnswer  } from "../../utils/api";
import { addQuestionIdIntoUser, addSelectedAnswerToUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_QUESTION_INTO_DATA = "SAVE_QUESTION_INTO_DATA";
export const SAVE_ANSWER_INTO_DATA = "SAVE_ANSWER_INTO_DATA";

function saveQuestionIntoData (ques){
    return {
        type: SAVE_QUESTION_INTO_DATA,
        ques
    }
}

function addAnswerIntoData (ans){
    return {
        type: SAVE_ANSWER_INTO_DATA,
        ans
    }
}

export function handleSaveAnswer(quesId, ans){
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestionAnswer({authedUser: authedUser, qid:quesId, answer:ans})
        .then(() => {
            dispatch(addAnswerIntoData({authedUser: authedUser, qid:quesId, answer:ans}));
            dispatch(addSelectedAnswerToUser({authedUser: authedUser, qid:quesId, answer:ans}));
        })
    }
}


export function handleAddQuesiton(optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState();

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then ((question) => {
            dispatch(saveQuestionIntoData(question))
            dispatch(addQuestionIdIntoUser(authedUser, question.id))
        })
    }
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}