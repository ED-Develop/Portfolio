import {BaseResponseType, instance} from "./api";
import {TUserModel} from "../types/types";

export type UsersResponseType = {
    items: Array<TUserModel>
    totalCount: number
    error: string
}

export const usersApi = {
    getUsers(count: number, currentPage: number) {
        return instance.get<UsersResponseType>(`users?count=${count}&page=${currentPage}`)
            .then(response => response.data)
    },
    getFriends(count: number) {
        return instance.get<UsersResponseType>(`users?count=${count}&friend=true`)
            .then(response => response.data);
    },
    searchUsers(userName: string) {
        return instance.get<UsersResponseType>(`users?term=${userName}`)
            .then(response => response.data)
    },
    follow(id: number) {
        return instance.post<BaseResponseType>(`follow/${id}`)
            .then(response => response.data.resultCode)
    },
    unFollow(id: number) {
        return instance.delete<BaseResponseType>(`follow/${id}`)
            .then(response => response.data.resultCode)
    },
};
