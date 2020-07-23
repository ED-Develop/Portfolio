import {appActions, AppActionsTypes} from "../app-reducer";
import {authActions, AuthActionsTypes, getOwnerProfileData} from "../auth-reducer";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, TProfileModel, TUserModel} from "../../types/types";
import {CommonThunkType, InferActionsTypes} from "../store";
import {profileApi} from "../../api/profile-api";
import {ResultCodesEnum} from "../../api/api";
import {usersApi} from "../../api/users-api";

const initialState = {
    profile: null as TProfileModel | null,
    status: '' as string,
    followed: false,
    isUpdateSuccess: false,
    friends: [] as Array<TUserModel>,
    friendsCount: 0
};

const profileReducer = (state = initialState, action: ProfileActionsTypes): TProfileInitialState => {
    switch (action.type) {
        case "PORTFOLIO/PROFILE/SET-USER-PROFILE":
        case "PORTFOLIO/PROFILE/SET_PROFILE_STATUS":
        case "PORTFOLIO/PROFILE/UPDATE_PROFILE_DATA_SUCCESS":
        case "PORTFOLIO/PROFILE/SET_FRIENDS":
        case "PORTFOLIO/PROFILE/SET_FRIENDS_COUNT":
            return {
                ...state,
                ...action.payload

            };
        case "PORTFOLIO/PROFILE/UPLOAD_PROFILE_PHOTO_SUCCESS":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: {
                        ...action.photos
                    }
                } as TProfileModel
            };
        default:
            return state;
    }
};

// actions

export const profileActions = {
    setUserProfile: (profile: TProfileModel) => ({
        type: 'PORTFOLIO/PROFILE/SET-USER-PROFILE',
        payload: {profile}
    } as const),
    setProfileStatus: (status: string) => ({type: 'PORTFOLIO/PROFILE/SET_PROFILE_STATUS', payload: {status}} as const),
    uploadProfilePhotoSuccess: (photos: PhotosType) => ({
        type: 'PORTFOLIO/PROFILE/UPLOAD_PROFILE_PHOTO_SUCCESS',
        photos
    } as const),
    updateProfileDataSuccess: (isUpdateSuccess: boolean) => ({
        type: 'PORTFOLIO/PROFILE/UPDATE_PROFILE_DATA_SUCCESS',
        payload: {isUpdateSuccess}
    } as const),
    setFriends: (friends: Array<TUserModel>) => ({
        type: 'PORTFOLIO/PROFILE/SET_FRIENDS',
        payload: {friends}
    } as const),
    setFriendsCount: (friendsCount: number) => ({
        type: 'PORTFOLIO/PROFILE/SET_FRIENDS_COUNT',
        payload: {friendsCount}
    } as const),
};

// thunks

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    let data = await profileApi.getUserProfile(userId);
    dispatch(profileActions.setUserProfile(data));
    dispatch(appActions.toggleIsFetching(false));
};

export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
    let status = await profileApi.getProfileStatus(userId);

    dispatch(profileActions.setProfileStatus(status));
};
export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
    let resultCode = await profileApi.updateProfileStatus(status);

    if (resultCode === ResultCodesEnum.Success) {
        dispatch(profileActions.setProfileStatus(status));
    }
};

export const uploadProfilePhoto = (photoFile: File): ThunkType => async (dispatch, getState) => {
    const authState = getState().auth;
    dispatch(appActions.uploadInProgress(true));
    const photos = await profileApi.uploadProfilePhoto((photoFile));

    dispatch(profileActions.uploadProfilePhotoSuccess(photos));
    dispatch(authActions.setProfileData(photos, authState.login, authState.status));
    dispatch(appActions.uploadInProgress(false));
};

export const updateProfileData = (profileData: TProfileModel): ThunkType => async (dispatch, getState) => {
    dispatch(profileActions.updateProfileDataSuccess(false));
    let response = await profileApi.updateProfileData(profileData);

    if (response.resultCode === ResultCodesEnum.Success) {
        let userId = getState().auth.userId;

        if (userId) dispatch(getOwnerProfileData(userId));

        dispatch(profileActions.updateProfileDataSuccess(true));
    } else {
        let errorItems = response.messages.map((message: any) => {
            let start = message.indexOf('>') + 1;
            let item = message.slice(start, message.indexOf(')', start));
            return item[0].toLowerCase() + item.slice(1);
        });

        type Errors = {
            contacts: any
        }

        let errors: Errors = {"contacts": {}};

        errorItems.forEach((item: string) => {
            errors["contacts"][item] = 'Invalid url format';
        });
        dispatch(stopSubmit('edit', errors));
    }
};

export const getFriends = (): ThunkType => async (dispatch) => {
    dispatch(appActions.toggleIsFetching(true));
    const data = await usersApi.getFriends(6, 1);

    dispatch(profileActions.setFriends(data.items));
    dispatch(profileActions.setFriendsCount(data.totalCount));
    dispatch(appActions.toggleIsFetching(false));
}

export type TProfileInitialState = typeof initialState;
type ProfileActionsTypes = InferActionsTypes<typeof profileActions>;
type ThunkType = CommonThunkType<ProfileActionsTypes | FormAction | AuthActionsTypes | AppActionsTypes>

export default profileReducer;
