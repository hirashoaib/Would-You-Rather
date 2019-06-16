export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_ID_INTO_USER = "ADD_QUESTION_ID_INTO_USER";
export const ADD_SELECTED_ANSWER_INTO_USER = "ADD_SELECTED_ANSWER_INTO_USER";

export function addSelectedAnswerToUser(data){
    return {
        type: ADD_SELECTED_ANSWER_INTO_USER,
        authedUser: data.authedUser,
        qid: data.qid,
        answer: data.answer
    }
}

export function addQuestionIdIntoUser(authedUser, questionId){
    return {
        type: ADD_QUESTION_ID_INTO_USER,
        authedUser,
        questionId
    }
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}