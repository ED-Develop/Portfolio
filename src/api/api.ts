import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "64c21cc3-b97f-48de-b1a2-ded888ce4466"
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
