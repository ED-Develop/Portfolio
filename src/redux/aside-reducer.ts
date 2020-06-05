import {TUserModel} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, CommonThunkType, InferActionsTypes} from "./store";
import {usersApi} from "../api/users-api";

const initialState = {
    friends: [] as Array<TUserModel>
};

const asideReducer = (state = initialState, action: AsideActionsTypes): InitialStateType => {
    switch (action.type) {
        case "PORTFOLIO/ASIDE/SET_FRIENDS":
            return {
                ...state,
                friends: [...action.friends]
            };
        default:
            return state;
    }
};


//actions

export const asideActions = {
    setFriends: (friends: Array<TUserModel>) => ({type: 'PORTFOLIO/ASIDE/SET_FRIENDS', friends} as const),
};

//thunks

export const getFriends = (): ThunkType => async (dispatch) => {
    const response = await usersApi.getUsers(6, 1);
    const data = await usersApi.getUsers(6, Math.ceil(response.totalCount / 6) - 1);

    dispatch(asideActions.setFriends(data.items));
};

type InitialStateType = typeof initialState;
type AsideActionsTypes = InferActionsTypes<typeof asideActions>;
type ThunkType = CommonThunkType<AsideActionsTypes>;

export default asideReducer;
