import {usersAPI} from "../api/api";
import {UserType} from "../types/types";

const SET_FRIENDS = 'portfolio/aside/SET_FRIENDS';

type InitialStateType = {
    friends: Array<UserType>
}

let initialState:InitialStateType = {
    friends: []
};

const asideReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_FRIENDS: {
            return {
                ...state,
                friends: [...action.friends]
            }
        }
        default: return state;
    }
};

type SetFriendsActionType = {
    type: typeof SET_FRIENDS,
    friends: Array<any>
}

const setFriends = (friends:Array<UserType>): SetFriendsActionType => {
    return {
        type: SET_FRIENDS,
        friends
    }
};

export const getFriends = () => async (dispatch: any) => {
    const response = await usersAPI.getUsers(6, 1);
    const data = await usersAPI.getUsers(6, Math.ceil(response.totalCount / 6) - 1);
    dispatch(setFriends(data.items));
};

export default asideReducer;