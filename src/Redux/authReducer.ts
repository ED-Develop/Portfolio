import {appActions} from "./appReducer";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType} from "../types/types";
import {AppStateType, CommonThunkType, InferActionsTypes} from "./reduxStore";
import {profileAPI} from "../api/profileApi";
import {authAPI} from "../api/authApi";
import {securityAPI} from "../api/securityApi";
import {ResultCodesEnum, ResultCodesForCaptchaEnum} from "../api/api";

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    photos: {} as PhotosType,
    captchaURL: null as string | null
};

type InitialStateType = typeof initialState;

export type AuthActionsTypes = InferActionsTypes<typeof authActions>;

const authReducer = (state = initialState, action: AuthActionsTypes): InitialStateType => {
    switch (action.type) {
        case "portfolio/auth/SET_PROFILE_DATA":
            return {
                ...state,
                login: action.login,
                photos: {...action.photos}
            };
        case "portfolio/auth/SET_CAPTCHA_URL":
        case "portfolio/auth/SET_USER_DATA":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

//actions

export const authActions = {
    setUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: 'portfolio/auth/SET_USER_DATA',
        payload: {userId, login, email, isAuth}
    } as const),
    setProfileData: (photos: any, login: string | null) => ({type: 'portfolio/auth/SET_PROFILE_DATA', photos, login} as const),
    setCaptchaUrl: (captchaURL: string | null) => ({type: 'portfolio/auth/SET_CAPTCHA_URL', payload: {captchaURL}} as const),
};

// thunks


type ThunkType = CommonThunkType<AuthActionsTypes | FormAction>;

export const getOwnerProfileData = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId);

    dispatch(authActions.setProfileData(data.photos, data.fullName));
};


export const auth = (): ThunkType => async (dispatch) => {
    let data = await authAPI.authMe();

    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = data.data;

        dispatch(getOwnerProfileData(id));
        dispatch(authActions.setUserData(id, login, email, true));
    }
};

export const login = (formData: any): ThunkType => async (dispatch) => {
        dispatch(appActions.toggleIsFetching(true));
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
        dispatch(authActions.setCaptchaUrl(null));
        dispatch(appActions.toggleIsFetching(false));
    }
;

export const logout = (): ThunkType => async (dispatch) => {
    let resultCode = await authAPI.logout();

    if (resultCode === ResultCodesEnum.Success) {
        dispatch(authActions.setUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.captcha();

    dispatch(authActions.setCaptchaUrl(data.url));
};


export default authReducer;
