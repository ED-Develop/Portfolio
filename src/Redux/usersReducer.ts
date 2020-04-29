import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";
import {appActions, AppActionsTypes} from "./appReducer";
import {UserType} from "../types/types";
import {CommonThunkType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";
import {ResultCodesEnum} from "../types/api-types";

const initialState = {
    usersData: [] as Array<UserType>,
    count: 6,
    currentPage: 1,
    startPage: 1,
    totalCount: 0,
    followingInProgress: [] as Array<number> //Array of user ids
};

type InitialStateType = typeof initialState;

type UserActionsTypes = InferActionsTypes<typeof userActions>;

const usersReducer = (state = initialState, action: UserActionsTypes): InitialStateType => {
    switch (action.type) {
        case "portfolio/users/FOLLOW":
        case "portfolio/users/UN-FOLLOW":
            return {
                ...state,
                usersData: updateObjectInArray(
                    state.usersData,
                    action.payload.userId,
                    'id',
                    {followed: action.payload.followed}
                )
            };
        case "portfolio/users/SET-USERS":
        case "portfolio/users/SET-CURRENT-PAGE":
        case "portfolio/users/SET-TOTAL-COUNT":
            return {
                ...state,
                ...action.payload
            };
        case "portfolio/users/TOGGLE_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };
        default:
            return state;
    }
};

// actions

export const userActions = {
    followSuccess: (userId: number) => ({type: 'portfolio/users/FOLLOW', payload: {userId, followed: true}} as const),
    unFollowSuccess: (userId: number) => ({type: 'portfolio/users/UN-FOLLOW', payload: {userId, followed: false}} as const),
    setUsers: (users: Array<UserType>) => ({type: 'portfolio/users/SET-USERS', payload: {usersData: users}} as const),
    setCurrentPage: (currentPage: number) => ({type: 'portfolio/users/SET-CURRENT-PAGE', payload: {currentPage}} as const),
    setTotalCount: (totalCount: number) => ({type: 'portfolio/users/SET-TOTAL-COUNT', payload: {totalCount}} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'portfolio/users/TOGGLE_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const),
};

//thunks

type ThunkType = CommonThunkType<UserActionsTypes | AppActionsTypes>;

export const getUsers = (count: number, currentPage: number): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    let data = await usersAPI.getUsers(count, currentPage);

    dispatch(userActions.setUsers(data.items));
    dispatch(userActions.setTotalCount(data.totalCount));
    dispatch(appActions.toggleIsFetching(false));
    dispatch(userActions.setCurrentPage(currentPage));
};

export const searchUsers = (userName: string): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    let data = await usersAPI.searchUsers(userName);

    dispatch(userActions.setUsers(data.items));
    dispatch(appActions.toggleIsFetching(false));
};

const followUnfollowFlow = async (apiMethod: (userId: number) => Promise<number>,
                                  dispatch: Dispatch<UserActionsTypes>, userId: number,
                                  actionCreator: (userId: number) => UserActionsTypes) => {
    dispatch(userActions.toggleFollowingProgress(true, userId));
    let resultCode = await apiMethod(userId);

    if (resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(userActions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    followUnfollowFlow(usersAPI.follow.bind(usersAPI), dispatch, userId, userActions.followSuccess);
};
export const unFollow = (userId: number) => (dispatch: any) => {
    followUnfollowFlow(usersAPI.unFollow.bind(usersAPI), dispatch, userId, userActions.unFollowSuccess);
};

export default usersReducer;
