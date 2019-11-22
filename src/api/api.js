import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "dc47ece0-8758-4796-b17f-9bb004a48cba"
    }
});

export const usersAPI = {
    getUsers(count, currentPage) {
        return instance.get(`users?count=${count}&page=${currentPage}`).then(response => response.data)
    },
    follow(id) {
        return instance.post(`follow/${id}`).then(response => {
            return response.data.resultCode;
        });
    },
    unFollow(id) {
       return  instance.delete(`follow/${id}`).then(response => {
           return response.data.resultCode;
       });
    }
};

export const profileAPI = {
    getUserProfile (userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },
    getProfileStatus (userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateProfileStatus (status) {
        return instance.put(`profile/status`, {status});
    },
    uploadProfilePhoto (photoFile) {
        let formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data.data.photos)
    },
    updateProfileData (profileData) {
        return instance.put(`profile`, profileData).then(response => {
            return  response.data;
        })
    }
};

export const authAPI = {
    authMe () {
        return instance.get('auth/me').then(response => response.data);
    },
    login (email, password, rememberMe, captcha) {
        return instance.post('auth/login', {email, password, rememberMe, captcha}).then(response => response.data);
    },
    logout () {
        return instance.post('auth/logout').then(response => response.data.resultCode);
    }
};

export const securityAPI = {
    captcha () {
        return instance.get('security/get-captcha-url').then( (response => response.data));
    }
};

