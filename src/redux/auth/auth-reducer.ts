import {FormAction, stopSubmit} from 'redux-form';
import {LoginFormData, PhotosType} from '../../types/types';
import {commonThunkHandler} from '../thunk-handler';
import {profileApi} from '../../api/profile-api';
import {authApi} from '../../api/auth-api';
import {ResultCodesEnum, ResultCodesForCaptchaEnum} from '../../api/api';
import {securityApi} from '../../api/security-api';
import {CommonThunkType, InferActionsTypes} from '../store';

const initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    status: null as string | null,
    isAuth: false,
    photos: {} as PhotosType,
    captchaURL: null as string | null
};

const authReducer = (state = initialState, action: AuthActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'PORTFOLIO/AUTH/SET_PROFILE_DATA':
            return {
                ...state,
                ...action.payload
            };
        case 'PORTFOLIO/AUTH/SET_CAPTCHA_URL':
        case 'PORTFOLIO/AUTH/SET_USER_DATA':
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
        type: 'PORTFOLIO/AUTH/SET_USER_DATA',
        payload: {userId, login, email, isAuth}
    } as const),
    setProfileData: (photos: PhotosType, login: string | null, status: string | null) => ({
        type: 'PORTFOLIO/AUTH/SET_PROFILE_DATA',
        payload: {photos, login, status}
    } as const),
    setCaptchaUrl: (captchaURL: string | null) => ({
        type: 'PORTFOLIO/AUTH/SET_CAPTCHA_URL',
        payload: {captchaURL}
    } as const),
};

// thunks

export const getOwnerProfileData = (userId: number): ThunkType => async (dispatch) => {
    await commonThunkHandler(async () => {
        const data = await profileApi.getUserProfile(userId);
        const status = await profileApi.getProfileStatus(userId);

        dispatch(authActions.setProfileData(data.photos, data.fullName, status));
    }, dispatch);
};

export const auth = (): ThunkType => async (dispatch) => {
    await commonThunkHandler(async () => {
        const data = await authApi.authMe();

        if (data.resultCode === ResultCodesEnum.Success) {
            const {id, login, email} = data.data;

            dispatch(getOwnerProfileData(id));
            dispatch(authActions.setUserData(id, login, email, true));
        }

        return data;
    }, dispatch, true);
};

export const login = (formData: LoginFormData): ThunkType => async (dispatch) => {
    await commonThunkHandler(async () => {
        const data = await authApi.login(formData.email, formData.password, formData.rememberMe, formData.captcha);

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(auth());
        } else {
            if (data.resultCode === ResultCodesForCaptchaEnum.IsCaptcha) {
                dispatch(getCaptchaUrl());
            }

            const message = data.messages ? data.messages : 'Some error';

            dispatch(stopSubmit('login', {_error: message}));
        }

        dispatch(authActions.setCaptchaUrl(null));
    }, dispatch, true);
};

export const logout = (): ThunkType => async (dispatch) => {
    await commonThunkHandler(async () => {
        const resultCode = await authApi.logout();

        if (resultCode === ResultCodesEnum.Success) {
            dispatch(authActions.setUserData(null, null, null, false));
        }

        return {resultCode};
    }, dispatch, true);
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    await commonThunkHandler(async () => {
        const data = await securityApi.captcha();

        dispatch(authActions.setCaptchaUrl(data.url));
    }, dispatch);
};

type InitialStateType = typeof initialState;
export type AuthActionsTypes = InferActionsTypes<typeof authActions>;
type ThunkType = CommonThunkType<AuthActionsTypes | FormAction>;

export default authReducer;
