import {AppStateType} from "../store";

export const getFirstName = (state: AppStateType) => state.profile.profile
    && state.profile.profile.fullName.split(' ')[0];
