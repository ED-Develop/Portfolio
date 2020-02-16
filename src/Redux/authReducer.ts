import {authAPI, profileAPI, securityAPI} from "../api/api";
import {toggleIsFetching} from "./appReducer";
import {stopSubmit} from "redux-form";
import {PhotosType} from "../types/types";

const SET_USER_DATA = 'portfolio/auth/SET_USER_DATA';
const TOGGLE_IS_AUTH = 'portfolio/auth/TOGGLE_IS_AUTH';
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
const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            };
        case TOGGLE_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
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

type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: {
        userId: number | null,
        login: string | null,
        email: string | null,
        isAuth: boolean | null
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

type SetProfileDataActionType = {
    type: typeof SET_PROFILE_DATA,
    photos: PhotosType,
    login: string
}

export const setProfileData = (photos: any, login:string ): SetProfileDataActionType => {
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

export const getOwnerProfileData = (userId: number) => async (dispatch:any) => {
    let data = await profileAPI.getUserProfile(userId);
    dispatch(setProfileData(data.photos, data.fullName));
};


export const auth = () => {
    return async (dispatch: any) => {
        let data = await authAPI.authMe();
        if (data.resultCode == 0) {
            let {id, login, email} = data.data;
            dispatch(getOwnerProfileData(id));
            dispatch(setUserData(id, login, email, true));
        }
    }
};

export const login = (formData: any) => {
        return async (dispatch: any) => {
            dispatch(toggleIsFetching(true));
            let data = await authAPI.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
            if (data.resultCode === 0) {
                dispatch(auth());
            } else {
                if (data.resultCode === 10) {
                    dispatch(getCaptchaUrl());
                } else {
                    let message = data.messages ? data.messages : 'Some error';
                    dispatch(stopSubmit('login', {_error: message}));
                }
            }
            dispatch(setCaptchaUrl(null));
            dispatch(toggleIsFetching(false));
        }
    }
;

export const logout = () => {
    return async (dispatch: any) => {
        let resultCode = await authAPI.logout();
        if (resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
        }
    }
};

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        let data = await securityAPI.captcha();
        dispatch(setCaptchaUrl(data.url));
    };
};


export default authReducer;