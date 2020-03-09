import {authAPI, profileAPI, securityAPI} from "../api/api";
import {toggleIsFetching, ToggleIsFetchingActionType} from "./appReducer";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {ResultCodesEnum, ResultCodesForCaptchaEnum} from "../types/api-types";

const SET_USER_DATA = 'portfolio/auth/SET_USER_DATA';
const SET_PROFILE_DATA = 'portfolio/auth/SET_PROFILE_DATA';
const SET_CAPTCHA_URL = 'portfolio/auth/SET_CAPTCHA_URL';

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    photos: {} as PhotosType,
    captchaURL: null as string | null
};

type InitialStateType = typeof initialState;

type ActionsTypes = SetUserDataActionType | SetProfileDataActionType | SetCaptchaUrlActionType;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            };
        case SET_PROFILE_DATA:
            return {
                ...state,
                login: action.login,
                photos: {...action.photos}
            };
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

//actions

type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: {
        userId: number | null,
        login: string | null,
        email: string | null,
        isAuth: boolean
    }
}

const setUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataActionType => {
    return {
        type: SET_USER_DATA,
        data: {
            userId,
            login,
            email,
            isAuth
        }
    }
};

export type SetProfileDataActionType = {
    type: typeof SET_PROFILE_DATA,
    photos: PhotosType,
    login: string | null
}

export const setProfileData = (photos: any, login: string | null): SetProfileDataActionType => {
    return {
        type: SET_PROFILE_DATA,
        photos,
        login
    }
};

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    payload: {
        captchaURL: string | null
    }
}

export const setCaptchaUrl = (captchaURL: string | null): SetCaptchaUrlActionType => {
    return {
        type: SET_CAPTCHA_URL,
        payload: {
            captchaURL
        }
    }
};

// thunks

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | ToggleIsFetchingActionType | FormAction>;

export const getOwnerProfileData = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId);

    dispatch(setProfileData(data.photos, data.fullName));
};


export const auth = (): ThunkType => async (dispatch) => {
    let data = await authAPI.authMe();

    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = data.data;

        dispatch(getOwnerProfileData(id));
        dispatch(setUserData(id, login, email, true));
    }
};

export const login = (formData: any): ThunkType => async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await authAPI.login(formData.email, formData.password, formData.rememberMe, formData.captcha);

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(auth());
        } else {
            if (data.resultCode === ResultCodesForCaptchaEnum.IsCaptcha) {
                dispatch(getCaptchaUrl());
            } else {
                let message = data.messages ? data.messages : 'Some error';

                dispatch(stopSubmit('login', {_error: message}));
            }
        }
        dispatch(setCaptchaUrl(null));
        dispatch(toggleIsFetching(false));
    }
;

export const logout = (): ThunkType => async (dispatch) => {
    let resultCode = await authAPI.logout();

    if (resultCode === ResultCodesEnum.Success) {
        dispatch(setUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.captcha();

    dispatch(setCaptchaUrl(data.url));
};


export default authReducer;