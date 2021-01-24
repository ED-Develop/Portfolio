import {TMessageModel} from '../../types/types';
import {CommonThunkType, InferActionsTypes} from '../store';
import {chatApi} from '../../api';
import {appActions} from '../app/app-reducer';

const initialState = {
    messages: [] as Array<TMessageModel>
};

const chatReducer = (state = initialState, action: ChatActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'PORTFOLIO/CHAT/SET_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };
        default:
            return state;
    }
};

const chatActions = {
    setMessages: (messages: Array<TMessageModel>) => ({
        type: 'PORTFOLIO/CHAT/SET_MESSAGES',
        payload: {messages}
    } as const)
};

export const startChatListening = (): ThunkType => async (dispatch) => {
    try {
        chatApi.connect();
        chatApi.subscribe((messages) => {
            dispatch(chatActions.setMessages(messages));
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

export type ChatActionsTypes = InferActionsTypes<typeof chatActions & typeof appActions>;

type ThunkType = CommonThunkType<ChatActionsTypes>;

export default chatReducer;
