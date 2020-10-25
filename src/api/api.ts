import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_SAMURAI_API,
    headers: {
        'API-KEY': process.env.REACT_APP_SAMURAI_API_KEY
    }
});


export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodesForCaptchaEnum {
    IsCaptcha = 10
}

export type BaseResponseType<D = {}, RC = ResultCodesEnum> = {
    resultCode: RC
    messages: Array<string>
    data: D
}
