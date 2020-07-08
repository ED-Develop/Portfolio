import {createSelector} from "reselect";
import {AppStateType} from "../store";
import {TUserModel} from "../../types/types";

export const getUsers = (state: AppStateType) => state.people.usersData;

export const getUsersData = createSelector(getUsers, (users) => {
    return users.filter((u) => true);
});

export type TFriendsTitle = Omit<Omit<TUserModel, 'status'>, 'followed'>

export const getCount = (state: AppStateType) => state.people.count;
export const getCurrentPage = (state: AppStateType) => state.people.currentPage;
export const getStartPage = (state: AppStateType) => state.people.startPage;
export const getTotalCount = (state: AppStateType) => state.people.totalCount;
export const getIsFetching = (state: AppStateType) => state.app.isFetching;
export const getFollowingInProgress = (state: AppStateType) => state.people.followingInProgress;

