import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";

const UN_FOLLOW = 'portfolio/users/UN-FOLLOW';
const FOLLOW = 'portfolio/users/FOLLOW';
const SET_USERS = 'portfolio/users/SET-USERS';
const SET_CURRENT_PAGE = 'portfolio/users/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'portfolio/users/SET-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'portfolio/users/TOGGLE-IS-FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'portfolio/users/TOGGLE_FOLLOWING_PROGRESS';


let initialState = {
    usersData: [],
    count: 6,
    currentPage: 1,
    startPage: 1,
    totalCount: 0,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', {followed:true})
            };
        case UN_FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', {followed:false})
            };
        case SET_USERS: {
            return {
                ...state,
                usersData: [...action.usersData]
            };
        }
        case SET_CURRENT_PAGE: {

            return {
                ...state,
                currentPage: action.currentPage
            };
        }
        case SET_TOTAL_COUNT: {
            return {
                ...state,
                totalCount: action.totalCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)

            }
        }
        default:
            return state;
    }
};


export const followSuccess = (userId) => {
    return {
        type: FOLLOW,
        userId: userId
    };
};
export const unFollowSuccess = (userId) => {
    return {
        type: UN_FOLLOW,
        userId: userId
    };
};

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        usersData: users
    };
};
export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
};
export const setTotalCount = (totalCount) => {
    return {
        type: SET_TOTAL_COUNT,
        totalCount: totalCount
    }
};

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
};
export const toggleFollowingProgress = (isFetching, userId) => {
    return {
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
};

export const getUsers = (count, currentPage) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(count, currentPage);
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));
        dispatch(toggleIsFetching(false));
        dispatch(setCurrentPage(currentPage));
    };
};

const followUnfollowFlow = async (apiMethod, actionCreator, dispatch, userId) => {
    dispatch(toggleFollowingProgress(true, userId));
    let resultCode = await apiMethod(userId);
    if (resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(usersAPI.follow.bind(usersAPI), followSuccess, dispatch, userId);
    }
};
export const unFollow = (userId) => {
    return (dispatch) => {
        followUnfollowFlow(usersAPI.unFollow.bind(usersAPI), unFollowSuccess, dispatch, userId);
    }
};

export default usersReducer;