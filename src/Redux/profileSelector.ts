import {AppStateType} from "./reduxStore";

export const getPosts = (state: AppStateType) => {
    return state.profile.postData;
};