import {auth} from "./authReducer";

const INITIALIZED_SUCCESS = 'portfolio/app/INITIALIZED_SUCCESS';
const TOGGLE_IS_FETCHING = 'portfolio/app/TOGGLE-IS-FETCHING';
const UPLOAD_IN_PROGRESS = 'portfolio/app/UPLOAD_IN_PROGRESS';
const SET_GLOBAL_ERROR = 'portfolio/app/SET_GLOBAL_ERROR';
const TOGGLE_IS_SUCCESS = 'portfolio/app/TOGGLE_IS_SUCCESS';

let initialState = {
    initialized: false,
    isFetching: false,
    isUpload: false,
    globalError: null,
    isSuccess: false
};

const appReducer = (state = initialState, action) => {
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

const intialezedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    }
};

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(auth());

    Promise.all([promise]).then( () => {
        dispatch(intialezedSuccess());
    })
};
export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
};
export const uploadInProgress = (isUpload) => {
    return {
        type: UPLOAD_IN_PROGRESS,
        isUpload
    }
};

export const setGlobalError = (globalError) => {
    return {
        type: SET_GLOBAL_ERROR,
        globalError
    }
};

export const toggleIsSuccess = (isSuccess) => {
    return {
        type:TOGGLE_IS_SUCCESS,
        payload: {
            isSuccess
        }
    }
};

export default appReducer;