import {auth} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, CommonThunkType, InferActionsTypes} from "./reduxStore";

let initialState = {
    initialized: false,
    isFetching: false,
    isUpload: false,
    globalError: null as any,
    isSuccess: false
};

type InitialStateType = typeof initialState;

export type AppActionsTypes = InferActionsTypes<typeof appActions>;

const appReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
    switch (action.type) {
        case "portfolio/app/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            };
        case "portfolio/app/TOGGLE-IS-FETCHING":
        case "portfolio/app/TOGGLE_IS_SUCCESS":
        case "portfolio/app/SET_GLOBAL_ERROR":
        case "portfolio/app/UPLOAD_IN_PROGRESS": {
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
    initializedSuccess: () => ({type: 'portfolio/app/INITIALIZED_SUCCESS'} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'portfolio/app/TOGGLE-IS-FETCHING', payload: {isFetching}} as const),
    uploadInProgress: (isUpload: boolean) => ({type: 'portfolio/app/UPLOAD_IN_PROGRESS', payload: {isUpload}} as const),
    setGlobalError: (globalError: any) => ({type: 'portfolio/app/SET_GLOBAL_ERROR', payload: {globalError}} as const),
    toggleIsSuccess: (isSuccess: boolean) => ({type: 'portfolio/app/TOGGLE_IS_SUCCESS', payload: {isSuccess}} as const),
};

// thunks

type ThunkType = CommonThunkType<AppActionsTypes>;

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(auth());

    Promise.all([promise]).then(() => {
        dispatch(appActions.initializedSuccess());
    })
};

export default appReducer;
