import {updateObjectInArray} from "../../utils/helpers";
import {appActions, AppActionsTypes} from "../app-reducer";
import {ArgumentTypes, TUserModel} from "../../types/types";
import {CommonThunkType, InferActionsTypes} from "../store";
import {Dispatch} from "redux";
import {usersApi, UsersResponseType} from "../../api/users-api";
import {ResultCodesEnum} from "../../api/api";

const initialState = {
    usersData: [] as Array<TUserModel>,
    count: 15,
    currentPage: 1,
    startPage: 1,
    totalCount: 0,
    followingInProgress: [] as Array<number>, //Array of user ids
    paginationValues: null as Map<number, number> | null
};

const usersReducer = (state = initialState, action: UserActionsTypes): TUsersInitialState => {
    switch (action.type) {
        case "PORTFOLIO/USERS/FOLLOW":
        case "PORTFOLIO/USERS/UN-FOLLOW":
            return {
                ...state,
                usersData: updateObjectInArray(
                    state.usersData,
                    action.payload.userId,
                    'id',
                    {followed: action.payload.followed}
                )
            };
        case "PORTFOLIO/USERS/SET-USERS":
        case "PORTFOLIO/USERS/SET-CURRENT-PAGE":
        case "PORTFOLIO/USERS/SET-TOTAL-COUNT":
        case "PORTFOLIO/USERS/SET_PAGE_SIZE":
            return {
                ...state,
                ...action.payload
            };
        case "PORTFOLIO/USERS/SET_PAGINATION_VALUES":
            return {
                ...state,
                paginationValues: new Map(action.payload.paginationValues)
            }
        case "PORTFOLIO/USERS/TOGGLE_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};

// actions

export const userActions = {
    followSuccess: (userId: number) => ({
        type: 'PORTFOLIO/USERS/FOLLOW',
        payload: {userId, followed: true}
    } as const),
    unFollowSuccess: (userId: number) => ({
        type: 'PORTFOLIO/USERS/UN-FOLLOW',
        payload: {userId, followed: false}
    } as const),
    setUsers: (users: Array<TUserModel>) => ({
        type: 'PORTFOLIO/USERS/SET-USERS',
        payload: {usersData: users}
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'PORTFOLIO/USERS/SET-CURRENT-PAGE',
        payload: {currentPage}
    } as const),
    setTotalCount: (totalCount: number) => ({
        type: 'PORTFOLIO/USERS/SET-TOTAL-COUNT',
        payload: {totalCount}
    } as const),
    setPageSize: (count: number) => ({
        type: 'PORTFOLIO/USERS/SET_PAGE_SIZE',
        payload: {count}
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'PORTFOLIO/USERS/TOGGLE_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const),
    setPaginationValues: (paginationValues: Map<number, number>) => ({
        type: 'PORTFOLIO/USERS/SET_PAGINATION_VALUES',
        payload: {paginationValues}
    } as const)
};

//thunks

const getUsersFlow = async <F extends Function>(
    apiMethod: (...args: Array<any>) => Promise<UsersResponseType>,
    dispatch: Dispatch,
    ...apiArgs: ArgumentTypes<F>
) => {
    const data = await apiMethod(...apiArgs);

    dispatch(userActions.setUsers(data.items));
    dispatch(userActions.setTotalCount(data.totalCount));

    return data;
};

export const getAllUsers = (count: number, currentPage: number): ThunkType => async (dispatch, getState) => {
    dispatch(appActions.toggleIsFetching(true));
    const peopleState = getState().people;
    const paginationValues = new Map<number, number>();

    if (!peopleState.paginationValues || count !== peopleState.count) {
        let totalCount;

        if (!peopleState.totalCount) {
            const data = await usersApi.getUsers(count, peopleState.currentPage);
            totalCount = data.totalCount;

            dispatch(userActions.setTotalCount(data.totalCount));
        } else {
            totalCount = peopleState.totalCount
        }

        let index = 1;

        for (let i = Math.floor(totalCount / count); i >= 0; i--) {
            if (i === 0) {
                paginationValues.set(index, 1);
            } else {
                paginationValues.set(index, i);
            }

            index++;
        }

        dispatch(userActions.setPaginationValues(paginationValues));
    }

    const loadedPage = peopleState.paginationValues && count === peopleState.count
        ? peopleState.paginationValues.get(currentPage)
        : paginationValues.get(currentPage);

    if (loadedPage) {
        await getUsersFlow<typeof usersApi.getUsers>(usersApi.getUsers, dispatch, count, loadedPage);
        dispatch(userActions.setCurrentPage(currentPage));
    }

    dispatch(appActions.toggleIsFetching(false));
}

export const getUsers = (count: number, currentPage: number): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    await getUsersFlow<typeof usersApi.getUsers>(usersApi.getUsers, dispatch, count, currentPage);
    dispatch(appActions.toggleIsFetching(false));
    dispatch(userActions.setCurrentPage(currentPage));
};

export const getFriends = (count: number, currentPage?: number): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    await getUsersFlow<typeof usersApi.getFriends>(usersApi.getFriends, dispatch, count, currentPage);
    dispatch(appActions.toggleIsFetching(false));
    if (currentPage) dispatch(userActions.setCurrentPage(currentPage)); //todo make currentPage required
};

export const searchUsers = (userName: string): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    await getUsersFlow<typeof usersApi.searchUsers>(usersApi.searchUsers, dispatch, userName);
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
    followUnfollowFlow(usersApi.follow.bind(usersApi), dispatch, userId, userActions.followSuccess);
};

export const unFollow = (userId: number) => (dispatch: any) => {
    followUnfollowFlow(usersApi.unFollow.bind(usersApi), dispatch, userId, userActions.unFollowSuccess);
};

export type TUsersInitialState = typeof initialState;
type UserActionsTypes = InferActionsTypes<typeof userActions>;
type ThunkType = CommonThunkType<UserActionsTypes | AppActionsTypes>;

export default usersReducer;
