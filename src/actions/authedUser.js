export const SET_AUTHORIZED_USER = "SET_AUTHORIZED_USER";

export function setAuthorizedUser(id) {
    return {
        type: SET_AUTHORIZED_USER,
        id,
    }
}