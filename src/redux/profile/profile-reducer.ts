import {appActions, AppActionsTypes} from '../app/app-reducer';
import {authActions, AuthActionsTypes, getOwnerProfileData} from '../auth/auth-reducer';
import {FormAction} from 'redux-form';
import {PhotosType, TProfileModel, TUserModel} from '../../types/types';
import {CommonThunkType, InferActionsTypes} from '../store';
import {profileApi} from '../../api/profile-api';
import {ResultCodesEnum} from '../../api/api';
import {usersApi} from '../../api/users-api';
import {commonThunkHandler} from '../thunk-handler';
import {getOwnerId} from '../common';

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
        case 'PORTFOLIO/PROFILE/SET-USER-PROFILE':
        case 'PORTFOLIO/PROFILE/SET_PROFILE_STATUS':
        case 'PORTFOLIO/PROFILE/SET_FRIENDS':
        case 'PORTFOLIO/PROFILE/SET_FRIENDS_COUNT':
            return {
                ...state,
                ...action.payload

            };
        case 'PORTFOLIO/PROFILE/UPLOAD_PROFILE_PHOTO_SUCCESS':
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

export const getUserProfile = (userId?: number): ThunkType => async (dispatch, getState) => {
    commonThunkHandler(async () => {
        const data = await profileApi.getUserProfile(userId || getOwnerId(getState));

        if (data) dispatch(profileActions.setUserProfile(data));
    }, dispatch, {visualization: false, resultCode: false});
};

export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
    await commonThunkHandler(async () => {
        const status = await profileApi.getProfileStatus(userId);

        if (status) dispatch(profileActions.setProfileStatus(status));
    }, dispatch, {visualization: false, resultCode: false});
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

export const updateProfileData = (profileData: Partial<TProfileModel>): ThunkType => async (dispatch, getState) => {
    await commonThunkHandler(async () => {
        const oldProfile = getState().profile.profile;

        if (!oldProfile) throw new Error('No existing profile');

        const newProfile = {...oldProfile, ...profileData};
        const response = await profileApi.updateProfileData(newProfile);

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(profileActions.setUserProfile(newProfile));
            dispatch(getOwnerProfileData());
        }

        return response;
    }, dispatch, {visualization: false, status: true});
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
