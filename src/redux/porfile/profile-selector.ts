import {AppStateType} from "../store";
import {createSelector} from "reselect";
import {TFriendsTitle} from "../users/users-selector";

export const getFirstName = (state: AppStateType) => state.profile.profile
    && state.profile.profile.fullName.split(' ')[0];

const getFriends = (state: AppStateType) => state.profile.friends;

export const getFriendsTitles = createSelector(getFriends, (users): Array<TFriendsTitle> => {
    return users.map(user => ({
        id: user.id,
        name: user.name,
        photos: user.photos
    }));
});