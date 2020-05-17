import {AppStateType} from "./store";

export const getPosts = (state: AppStateType) => state.profile.postData;
