import {PhotosType, TProfileModel} from "../types/types";
import {BaseResponseType, instance} from "./api";

export type ProfilePhotoResponseType = {
    photos: PhotosType
}

export const profileApi = {
    getUserProfile(userId: number) {
        return instance.get<TProfileModel>(`profile/${userId}`)
            .then(response => response.data);
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data);
    },
    updateProfileStatus(status: string) {
        return instance.put<BaseResponseType>(`profile/status`, {status})
            .then(response => response.data.resultCode);
    },
    uploadProfilePhoto(photoFile: File) {
        let formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<BaseResponseType<ProfilePhotoResponseType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data.data.photos);
    },
    updateProfileData(profileData: TProfileModel) {
        return instance.put<BaseResponseType<TProfileModel>>(`profile`, profileData)
            .then(response => response.data)
    }
};
