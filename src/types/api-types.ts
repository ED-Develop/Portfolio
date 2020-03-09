import {PhotosType, UserType} from "./types";

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodesForCaptchaEnum {
    IsCaptcha = 10
}

export type BaseResponseType<D> = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: D
}

export type UsersResponseType =  {
    items: Array<UserType>
    totalCount: number
    error: string
}

export type ProfilePhotoResponseType = {
    photos: PhotosType
}

export type AuthMeResponseType = {
    id: number
    email: string
    login: string
};

export type LoginResponseType = {
    resultCode: ResultCodesEnum | ResultCodesForCaptchaEnum
    messages: Array<string>
    data: {
        userId: string
    }
}

export type CaptchaResponseType = {
    url: string
}