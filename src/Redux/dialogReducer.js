import {dialogsAPI} from "../api/api";
import {toggleIsFetching, toggleIsSuccess} from "./appReducer";

const ADD_MESSAGE = 'portfolio/dialogs/ADD-MESSAGE';
const SET_DIALOGS = 'portfolio/dialogs/SET_DIALOGS';
const SET_MESSAGES = 'portfolio/dialogs/SET_MESSAGES';

let initialState = {
    dialogs: [],
    messages: []
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: `${state.messages.length ? +state.messages[state.messages.length - 1].id + 1 : 1}`,
                userId: action.userId,
                date: 'a min ago',
                message: action.messageText,
                avatar: null,
                user: action.login
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
        case SET_DIALOGS: {
            return {
                ...state,
                dialogs: [...action.dialogs]
            }
        }
        case SET_MESSAGES: {
            return {
                ...state,
                messages: [...action.messages]
            }
        }
        default:
            return state;
    }
};

export const addMessage = (messageText, userId, login) => ({type: ADD_MESSAGE, messageText, userId, login});

export const setDialogs = (dialogs) => {
    return {
        type: SET_DIALOGS,
        dialogs
    }
};

export const setMessages = (messages) => {
    return {
        type: SET_MESSAGES,
        messages
    }
};


export const startDialogs = (userId) => async (dispatch) => {
    await dialogsAPI.startDialog(userId);
    dispatch(toggleIsSuccess(true));
};

export const getDialogs = () => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await dialogsAPI.getDialogs();
    dispatch(setDialogs(data));
    dispatch(toggleIsFetching(false));
};

/*export const sendMessage = (userId, message) => async (dispatch) => {
    await dialogsAPI.sendMessage(userId, message);
};*/

export const getMessages = (userId) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    await dialogsAPI.getMessages(userId);
    dispatch(toggleIsFetching(false));
};

export default dialogReducer;