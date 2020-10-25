import {AppStateType} from '../store';
import {createSelector} from 'reselect';
import {TFriendsTitle} from '../users/users-selector';

export const selectFirstName = (state: AppStateType) => state.profile.profile
    && state.profile.profile.fullName.split(' ')[0];

const getFriends = (state: AppStateType) => state.profile.friends;

export const selectFriendsTitles = createSelector(getFriends, (users): Array<TFriendsTitle> => {
    return users.map(user => ({
        id: user.id,
        name: user.name,
        photos: user.photos
    }));
});

const getProfile = (state: AppStateType) => state.profile.profile;

export const getProfileAbout = createSelector(getProfile, profile => {
    if (profile) {
        const {fullName, aboutMe, lookingForAJob, lookingForAJobDescription} = profile;

        return {
            fullName,
            aboutMe,
            lookingForAJob,
            lookingForAJobDescription
        }
    }

    return null;
})

export const getProfileLinks = createSelector(getProfile, profile => {
    if (profile) return {...profile.contacts};

    return null;
});


