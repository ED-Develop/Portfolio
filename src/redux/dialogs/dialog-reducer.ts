import {appActions, AppActionsTypes} from "../app/app-reducer";
import {CommonThunkType, InferActionsTypes} from "../store";
import {dialogsApi} from "../../api/dialogs-api";

const initialState = {
    dialogs: [] as Array<any>,
    messages: [] as Array<any>
};

const dialogReducer = (state = initialState, action: DialogsActionsTypes): InitialStateType => {
    switch (action.type) {
        case "PORTFOLIO/DIALOGS/ADD-MESSAGE":
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
        case "PORTFOLIO/DIALOGS/SET_DIALOGS":
            return {
                ...state,
                dialogs: [...action.dialogs]
            };
        case "PORTFOLIO/DIALOGS/SET_MESSAGES":
            return {
                ...state,
                messages: [...action.messages]
            };
        default:
            return state;
    }
};

// actions

export const dialogsActions = {
    addMessage: (messageText: string, userId: number, login: string) => ({
        type: 'PORTFOLIO/DIALOGS/ADD-MESSAGE',
        messageText,
        userId,
        login
    } as const),
    setDialogs: (dialogs: Array<any>) => ({type: 'PORTFOLIO/DIALOGS/SET_DIALOGS', dialogs} as const),
    setMessages: (messages: Array<any>) => ({type: 'PORTFOLIO/DIALOGS/SET_MESSAGES', messages} as const),
};


// thunks

export const startDialogs = (userId: number): ThunkType => async (dispatch) => {
    await dialogsApi.startDialog(userId);
    dispatch(appActions.toggleIsSuccess(true));
};

export const getDialogs = (): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    const data = await dialogsApi.getDialogs();
    dispatch(dialogsActions.setDialogs(data));
    dispatch(appActions.toggleIsFetching(false));
};

export const getMessages = (userId: number): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    await dialogsApi.getMessages(userId);
    dispatch(appActions.toggleIsFetching(false));
};

type InitialStateType = typeof initialState;
type DialogsActionsTypes = InferActionsTypes<typeof dialogsActions>;
type ThunkType = CommonThunkType<DialogsActionsTypes | AppActionsTypes>

export default dialogReducer;
