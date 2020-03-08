import {dialogsAPI} from "../api/api";
import {toggleIsFetching, ToggleIsFetchingActionType, toggleIsSuccess, ToggleIsSuccessActionType} from "./appReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const ADD_MESSAGE = 'portfolio/dialogs/ADD-MESSAGE';
const SET_DIALOGS = 'portfolio/dialogs/SET_DIALOGS';
const SET_MESSAGES = 'portfolio/dialogs/SET_MESSAGES';

let initialState = {
    dialogs: [] as Array<any>,
    messages: [] as Array<any>
};

type InitialStateType = typeof initialState;

type ActionsTypes = AddMessageActionType | SetDialogsActionType | SetMessagesActionType;

const dialogReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

// actions

type AddMessageActionType = {
    type: typeof ADD_MESSAGE,
    messageText: string,
    userId: number,
    login: string
}

export const addMessage = (messageText: string, userId: number, login: string): AddMessageActionType => {
    return {type: ADD_MESSAGE, messageText, userId, login}
};

type SetDialogsActionType = {
    type: typeof SET_DIALOGS,
    dialogs: Array<any>
}

export const setDialogs = (dialogs: Array<any>): SetDialogsActionType => {
    return {
        type: SET_DIALOGS,
        dialogs
    }
};

type SetMessagesActionType = {
    type: typeof SET_MESSAGES,
    messages: Array<any>
}

export const setMessages = (messages: Array<any>): SetMessagesActionType => {
    return {
        type: SET_MESSAGES,
        messages
    }
};

// thunks

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | ToggleIsFetchingActionType
    | ToggleIsSuccessActionType>;

export const startDialogs = (userId: number): ThunkType => async (dispatch) => {
    await dialogsAPI.startDialog(userId);
    dispatch(toggleIsSuccess(true));
};

export const getDialogs = (): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await dialogsAPI.getDialogs();
    dispatch(setDialogs(data));
    dispatch(toggleIsFetching(false));
};

export const getMessages = (userId: number): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    await dialogsAPI.getMessages(userId);
    dispatch(toggleIsFetching(false));
};

export default dialogReducer;