import {AppStateType} from "./reduxStore";

export const getPosts = (state: AppStateType) => state.profile.postData;
