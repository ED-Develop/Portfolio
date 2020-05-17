import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, CommonThunkType, InferActionsTypes} from "./reduxStore";
import {usersAPI} from "../api/usersApi";

const initialState = {
    friends: [] as Array<UserType>
};

type InitialStateType = typeof initialState;
type AsideActionsTypes = InferActionsTypes<typeof asideActions>;

const asideReducer = (state = initialState, action: AsideActionsTypes): InitialStateType => {
    switch (action.type) {
        case "portfolio/aside/SET_FRIENDS": {
            return {
                ...state,
                friends: [...action.friends]
            }
        }
        default:
            return state;
    }
};


//actions

export const asideActions = {
    setFriends: (friends: Array<UserType>) => ({type: 'portfolio/aside/SET_FRIENDS', friends} as const),
};

//thunks

type ThunkType = CommonThunkType<AsideActionsTypes>;

export const getFriends = (): ThunkType => async (dispatch) => {
    const response = await usersAPI.getUsers(6, 1);
    const data = await usersAPI.getUsers(6, Math.ceil(response.totalCount / 6) - 1);

    dispatch(asideActions.setFriends(data.items));
};

export default asideReducer;
