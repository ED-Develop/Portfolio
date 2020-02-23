import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

export const getUsersDataSelector = (state: AppStateType) => {
    return state.peoplePage.usersData;
};

export const getUsersData = createSelector(getUsersDataSelector, (users) => {
    return  users.filter( (u) => true);
});

export const getCount = (state: AppStateType) => {
    return state.peoplePage.count;
};

export const getCurrentPage = (state: AppStateType) => {
    return state.peoplePage.currentPage;
};

export const getStartPage = (state: AppStateType) => {
    return state.peoplePage.startPage;
};

export const getTotalCount = (state: AppStateType) => {
    return state.peoplePage.totalCount;
};

export const getIsFetching = (state: AppStateType) => {
    return state.app.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.peoplePage.followingInProgress;
};

