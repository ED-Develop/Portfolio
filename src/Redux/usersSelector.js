import {createSelector} from "reselect";

export const getUsersDataSelector = (state) => {
    return state.peoplePage.usersData;
};

export const getUsersData = createSelector(getUsersDataSelector, (users) => {
    return  users.filter( (u) => true);
});

export const getCount = (state) => {
    return state.peoplePage.count;
};

export const getCurrentPage = (state) => {
    return state.peoplePage.currentPage;
};

export const getStartPage = (state) => {
    return state.peoplePage.startPage;
};

export const getTotalCount = (state) => {
    return state.peoplePage.totalCount;
};

export const getIsFetching = (state) => {
    return state.peoplePage.isFetching;
};

export const getFollowingInProgress = (state) => {
    return state.peoplePage.followingInProgress;
};

