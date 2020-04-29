import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

export const getUsersDataSelector = (state: AppStateType) => state.people.usersData;

export const getUsersData = createSelector(getUsersDataSelector, (users) => {
    return  users.filter( (u) => true);
});

export const getCount = (state: AppStateType) => state.people.count;
export const getCurrentPage = (state: AppStateType) => state.people.currentPage;
export const getStartPage = (state: AppStateType) => state.people.startPage;
export const getTotalCount = (state: AppStateType) => state.people.totalCount;
export const getIsFetching = (state: AppStateType) => state.app.isFetching;
export const getFollowingInProgress = (state: AppStateType) => state.people.followingInProgress;

