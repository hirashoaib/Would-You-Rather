import { getInitialData } from '../../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

export function handleIntialData(){
    return (dispatch) => {
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
            })
    }
}
