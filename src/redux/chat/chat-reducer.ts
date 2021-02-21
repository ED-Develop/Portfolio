import {TMessageModel} from '../../types/types';
import {CommonThunkType, InferActionsTypes} from '../store';
import {chatApi} from '../../api';
import {appActions, AppActionsTypes} from '../app/app-reducer';
import {TWsStatus} from '../../api/web-socket/web-socket-api';

const initialState = {
    messages: [] as Array<TMessageModel>,
    status: 'closed' as TWsStatus
};

const chatReducer = (state = initialState, action: ChatActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'PORTFOLIO/CHAT/SET_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };
        case 'PORTFOLIO/CHAT/SET_STATUS':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

const chatActions = {
    setMessages: (messages: Array<TMessageModel>) => ({
        type: 'PORTFOLIO/CHAT/SET_MESSAGES',
        payload: {messages}
    } as const),
    setStatus: (status: TWsStatus) => ({
        type: 'PORTFOLIO/CHAT/SET_STATUS',
        payload: {status}
    } as const)
};

export const startChatListening = (): ThunkType => async (dispatch) => {
    try {
        chatApi.connectChat();
        chatApi.subscribe<Array<TMessageModel>>('message', messages => {
            dispatch(chatActions.setMessages(messages));
        });
        chatApi.subscribe<TWsStatus>('status', status => {
            dispatch(chatActions.setStatus(status));
        });
    } catch (e) {
        dispatch(appActions.setGlobalError(e));
    }
};

export const stopChatListening = (): ThunkType => async (dispatch) => {
    try {
        chatApi.stop();
    } catch (e) {
        dispatch(appActions.setGlobalError(e));
    }
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    try {
        chatApi.send(message);
    } catch (e) {
        dispatch(appActions.setGlobalError(e));
    }
};

type InitialStateType = typeof initialState;

export type ChatActionsTypes = InferActionsTypes<typeof chatActions>;

type ThunkType = CommonThunkType<ChatActionsTypes | AppActionsTypes>;

export default chatReducer;
