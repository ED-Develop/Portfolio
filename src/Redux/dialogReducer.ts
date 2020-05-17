import {appActions, AppActionsTypes} from "./appReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, CommonThunkType, InferActionsTypes} from "./reduxStore";
import {dialogsAPI} from "../api/dialogsApi";

const initialState = {
    dialogs: [] as Array<any>,
    messages: [] as Array<any>
};

type InitialStateType = typeof initialState;

type DialogsActionsTypes = InferActionsTypes<typeof dialogsActions>;

const dialogReducer = (state = initialState, action: DialogsActionsTypes): InitialStateType => {
    switch (action.type) {
        case "portfolio/dialogs/ADD-MESSAGE": {
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
        case "portfolio/dialogs/SET_DIALOGS": {
            return {
                ...state,
                dialogs: [...action.dialogs]
            }
        }
        case "portfolio/dialogs/SET_MESSAGES": {
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

export const dialogsActions = {
    addMessage: (messageText: string, userId: number, login: string) => ({
        type: 'portfolio/dialogs/ADD-MESSAGE',
        messageText,
        userId,
        login
    } as const),
    setDialogs: (dialogs: Array<any>) => ({type: 'portfolio/dialogs/SET_DIALOGS', dialogs} as const),
    setMessages: (messages: Array<any>) => ({type: 'portfolio/dialogs/SET_MESSAGES', messages} as const),
};


// thunks

type ThunkType = CommonThunkType<DialogsActionsTypes | AppActionsTypes>

export const startDialogs = (userId: number): ThunkType => async (dispatch) => {
    await dialogsAPI.startDialog(userId);
    dispatch(appActions.toggleIsSuccess(true));
};

export const getDialogs = (): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    const data = await dialogsAPI.getDialogs();
    dispatch(dialogsActions.setDialogs(data));
    dispatch(appActions.toggleIsFetching(false));
};

export const getMessages = (userId: number): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    await dialogsAPI.getMessages(userId);
    dispatch(appActions.toggleIsFetching(false));
};

export default dialogReducer;
