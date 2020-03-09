import axios from "axios";
import {ProfileType} from "../types/types";
import {
    UsersResponseType,
    ProfilePhotoResponseType,
    BaseResponseType,
    AuthMeResponseType,
    LoginResponseType,
    CaptchaResponseType
} from "../types/api-types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "64c21cc3-b97f-48de-b1a2-ded888ce4466"
    }
});

export const usersAPI = {
    getUsers(count: number, currentPage: number) {
        return instance.get<UsersResponseType>(`users?count=${count}&page=${currentPage}`).then(response => response.data)
    },
    searchUsers(userName: string) {
        return instance.get<UsersResponseType>(`users?term=${userName}`).then(response => response.data)
    },
    follow(id: number) {
        return instance.post<BaseResponseType<unknown>>(`follow/${id}`).then(response => response.data.resultCode)
    },
    unFollow(id: number) {
        return instance.delete<BaseResponseType<unknown>>(`follow/${id}`).then(response => response.data.resultCode)
    }
};

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data);
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data);
    },
    updateProfileStatus(status: string) {
        return instance.put<BaseResponseType<unknown>>(`profile/status`, {status}).then(response => response.data.resultCode);
    },
    uploadProfilePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<BaseResponseType<ProfilePhotoResponseType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data.data.photos)
    },
    updateProfileData(profileData: ProfileType) {
        return instance.put<BaseResponseType<ProfileType>>(`profile`, profileData).then(response => response.data)
    }
};

export const authAPI = {
    authMe() {
        return instance.get<BaseResponseType<AuthMeResponseType>>('auth/me').then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
    logout() {
        return instance.post<BaseResponseType<unknown>>('auth/logout').then(response => response.data.resultCode);
    }
};


export const securityAPI = {
    captcha() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url').then((response => response.data));
    }
};

export const dialogsAPI = {
    startDialog(userId: number) {
        return instance.put(`dialogs/${userId}`);
    },
    async getDialogs() {
        const response = await instance.get('dialogs');
        return response.data;
    },
    getMessages(userId: number) {
        return instance.get(`dialogs/${userId}/messages`);
    },
    /*sendMessage (userId, message) {
        return instance.post(`dialogs/${userId}/messages`, {message});
    }*/
};
