import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

export const getUsersDataSelector = (state: AppStateType) => {
    return state.people.usersData;
};

export const getUsersData = createSelector(getUsersDataSelector, (users) => {
    return  users.filter( (u) => true);
});

export const getCount = (state: AppStateType) => {
    return state.people.count;
};

export const getCurrentPage = (state: AppStateType) => {
    return state.people.currentPage;
};

export const getStartPage = (state: AppStateType) => {
    return state.people.startPage;
};

export const getTotalCount = (state: AppStateType) => {
    return state.people.totalCount;
};

export const getIsFetching = (state: AppStateType) => {
    return state.app.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.people.followingInProgress;
};

