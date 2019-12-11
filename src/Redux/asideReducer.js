import {usersAPI} from "../api/api";

const SET_FRIENDS = 'portfolio/aside/SET_FRIENDS';

let initialState = {
    friends: []
};

const asideReducer = (state = initialState, action) => {
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

const setFriends = (friends) => {
    return {
        type: SET_FRIENDS,
        friends
    }
};

export const getFriends = () => async (dispatch) => {
    const response = await usersAPI.getUsers(6, 1);
    const data = await usersAPI.getUsers(6, Math.ceil(response.totalCount / 6) - 1);
    dispatch(setFriends(data.items));
};

export default asideReducer;