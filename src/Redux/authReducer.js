import {authAPI, profileAPI, securityAPI} from "../api/api";

import {stopSubmit} from "redux-form";
import {toggleIsFetching} from "./appReducer";

const SET_USER_DATA = 'portfolio/auth/SET_USER_DATA';
const TOGGLE_IS_AUTH = 'portfolio/auth/TOGGLE_IS_AUTH';
const SET_PROFILE_DATA = 'portfolio/auth/SET_PROFILE_DATA';
const SET_CAPTCHA_URL = 'portfolio/auth/SET_CAPTCHA_URL';



let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    photos: {},
    captchaURL: null
};

const authReducer = (state = initialState, action) => {
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

const setUserData = (userId, login, email, isAuth) => {
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
export const setProfileData = (photos, login ) => {
    return {
        type: SET_PROFILE_DATA,
        photos,
        login
    }
};

export const setCaptchaUrl = (captchaURL) => {
    return {
        type: SET_CAPTCHA_URL,
        payload: {
            captchaURL
        }
    }
};

export const getOwnerProfileData = (userId) => async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId);
    dispatch(setProfileData(data.photos, data.fullName));
};


export const auth = () => {
    return async (dispatch) => {
        let data = await authAPI.authMe();
        if (data.resultCode == 0) {
            let {id, login, email} = data.data;
            dispatch(getOwnerProfileData(id));
            dispatch(setUserData(id, login, email, true));
        }
    }
};

export const login = (formData) => {
        return async (dispatch) => {
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
    return async (dispatch) => {
        let resultCode = await authAPI.logout();
        if (resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
        }
    }
};

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        let data = await securityAPI.captcha();
        dispatch(setCaptchaUrl(data.url));
    };
};


export default authReducer;