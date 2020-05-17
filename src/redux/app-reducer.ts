import {auth} from "./auth-reducer";
import {CommonThunkType, InferActionsTypes} from "./store";

const initialState = {
    initialized: false,
    isFetching: false,
    isUpload: false,
    globalError: null as any,
    isSuccess: false
};

const appReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
    switch (action.type) {
        case "PORTFOLIO/APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            };
        case "PORTFOLIO/APP/TOGGLE-IS-FETCHING":
        case "PORTFOLIO/APP/TOGGLE_IS_SUCCESS":
        case "PORTFOLIO/APP/SET_GLOBAL_ERROR":
        case "PORTFOLIO/APP/UPLOAD_IN_PROGRESS": {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
};

//actions

export const appActions = {
    initializedSuccess: () => ({type: 'PORTFOLIO/APP/INITIALIZED_SUCCESS'} as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'PORTFOLIO/APP/TOGGLE-IS-FETCHING',
        payload: {isFetching}
    } as const),
    uploadInProgress: (isUpload: boolean) => ({type: 'PORTFOLIO/APP/UPLOAD_IN_PROGRESS', payload: {isUpload}} as const),
    setGlobalError: (globalError: any) => ({type: 'PORTFOLIO/APP/SET_GLOBAL_ERROR', payload: {globalError}} as const),
    toggleIsSuccess: (isSuccess: boolean) => ({type: 'PORTFOLIO/APP/TOGGLE_IS_SUCCESS', payload: {isSuccess}} as const),
};

// thunks

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(auth());

    Promise.all([promise]).then(() => {
        dispatch(appActions.initializedSuccess());
    })
};

type InitialStateType = typeof initialState;

export type AppActionsTypes = InferActionsTypes<typeof appActions>;

type ThunkType = CommonThunkType<AppActionsTypes>;

export default appReducer;
