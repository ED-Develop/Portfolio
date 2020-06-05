import {AppStateType} from "../store";
import {createSelector} from "reselect";
import {TContacts} from "../../types/types";

const getProfile = (state: AppStateType) => state.profile.profile;

export type TAboutProfile = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: TContacts
}

export const getAboutProfileInfo = createSelector(getProfile, (profile): TAboutProfile | null => {
    if (profile) {
        return {
            aboutMe: profile?.aboutMe,
            contacts: profile.contacts,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription
        }
    }

    return profile;
});
