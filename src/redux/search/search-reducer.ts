import {CommonThunkType, InferActionsTypes} from "../store";
import {TUserModel} from "../../types/types";
import {appActions, AppActionsTypes} from "../app-reducer";
import {usersApi} from "../../api/users-api";
import {users} from "../../utils/test/models";

const initialState = {
    searchItems: users as Array<TUserModel>
}

const searchReducer = (state = initialState, action: SearchActionsTypes): TSearchInitialState => {
    switch (action.type) {
        case "PORTFOLIO/SEARCH/SET_RESULTS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const searchActions = {
    setSearchItems: (searchItems: Array<TUserModel>) => ({
        type: 'PORTFOLIO/SEARCH/SET_RESULTS',
        payload: {searchItems}
    } as const)
};

// thunks

export const searchItems = (string: string): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    const data = await usersApi.searchUsers(string);

    dispatch(searchActions.setSearchItems(data.items));
    dispatch(appActions.toggleIsFetching(false));
};

export type SearchActionsTypes = InferActionsTypes<typeof searchActions>;
export type TSearchInitialState = typeof initialState;
type ThunkType = CommonThunkType<SearchActionsTypes | AppActionsTypes>;

export default searchReducer;