import {BaseResponseType, instance, ResultCodesEnum, ResultCodesForCaptchaEnum} from "./api";

export type AuthMeResponseType = {
    id: number
    email: string
    login: string
};

export type LoginResponseType = {
    userId: string
};

type LoginResultCode = ResultCodesEnum | ResultCodesForCaptchaEnum;

export const authAPI = {
    authMe() {
        return instance.get<BaseResponseType<AuthMeResponseType>>('auth/me')
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<BaseResponseType<LoginResponseType, LoginResultCode>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(response => response.data);
    },
    logout() {
        return instance.post<BaseResponseType<unknown>>('auth/logout')
            .then(response => response.data.resultCode);
    }
};
