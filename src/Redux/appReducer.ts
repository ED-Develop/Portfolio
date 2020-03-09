import {auth} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const INITIALIZED_SUCCESS = 'portfolio/app/INITIALIZED_SUCCESS';
const TOGGLE_IS_FETCHING = 'portfolio/app/TOGGLE-IS-FETCHING';
const UPLOAD_IN_PROGRESS = 'portfolio/app/UPLOAD_IN_PROGRESS';
const SET_GLOBAL_ERROR = 'portfolio/app/SET_GLOBAL_ERROR';
const TOGGLE_IS_SUCCESS = 'portfolio/app/TOGGLE_IS_SUCCESS';

type InitialStateType = {
    initialized: boolean,
    isFetching: boolean,
    isUpload: boolean,
    globalError: any,
    isSuccess: boolean
}

let initialState: InitialStateType = {
    initialized: false,
    isFetching: false,
    isUpload: false,
    globalError: null,
    isSuccess: false
};

type ActionsTypes = IntialezedSuccessActionType | ToggleIsFetchingActionType | UploadInProgressActionType
    | SetGlobalErrorActionType | ToggleIsSuccessActionType;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case UPLOAD_IN_PROGRESS: {
            return {
                ...state,
                isUpload: action.isUpload
            }
        }
        case SET_GLOBAL_ERROR: {
            return {
                ...state,
                globalError: action.globalError
            }
        }
        case TOGGLE_IS_SUCCESS: {
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

type IntialezedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS;
}

const intialezedSuccess = (): IntialezedSuccessActionType => {
    return {
        type: INITIALIZED_SUCCESS
    }
};

export type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
};

export type UploadInProgressActionType = {
    type: typeof UPLOAD_IN_PROGRESS,
    isUpload: boolean
}

export const uploadInProgress = (isUpload: boolean): UploadInProgressActionType => {
    return {
        type: UPLOAD_IN_PROGRESS,
        isUpload
    }
};

type SetGlobalErrorActionType = {
    type: typeof SET_GLOBAL_ERROR,
    globalError: any
}

export const setGlobalError = (globalError: any): SetGlobalErrorActionType => {
    return {
        type: SET_GLOBAL_ERROR,
        globalError
    }
};

export type ToggleIsSuccessActionType = {
    type: typeof TOGGLE_IS_SUCCESS,
    payload: {
        isSuccess: boolean
    }
}

export const toggleIsSuccess = (isSuccess: boolean): ToggleIsSuccessActionType => {
    return {
        type: TOGGLE_IS_SUCCESS,
        payload: {
            isSuccess
        }
    }
};

// thunks

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(auth());

    Promise.all([promise]).then(() => {
        dispatch(intialezedSuccess());
    })
};

export default appReducer;