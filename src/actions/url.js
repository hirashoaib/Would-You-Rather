export const SAVE_URL = "SAVE_URL";
export const REMOVE_URL = "REMOVE_URL";

export function saveURL (matchObj){
    return {
        type: SAVE_URL,
        matchObj
    }
}

export function removeURL (){
    return {
        type: REMOVE_URL
    }
}
