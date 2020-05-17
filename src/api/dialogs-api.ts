import {instance} from "./api";

export const dialogsApi = {
    startDialog(userId: number) {
        return instance.put(`dialogs/${userId}`);
    },
    getDialogs() {
        return instance.get('dialogs').then(response => response.data);
    },
    getMessages(userId: number) {
        return instance.get(`dialogs/${userId}/messages`);
    },
    /*sendMessage (userId, message) {
        return instance.post(`dialogs/${userId}/messages`, {message});
    }*/
};
