import {instance} from "./api";

export type CaptchaResponseType = {
    url: string
}

export const securityAPI = {
    captcha() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url')
            .then((response => response.data));
    }
};
