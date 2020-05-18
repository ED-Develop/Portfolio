import {appActions, AppActionsTypes} from "./app-reducer";
import {getOwnerProfileData, authActions, AuthActionsTypes} from "./auth-reducer";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {CommonThunkType, InferActionsTypes} from "./store";
import {profileApi} from "../api/profile-api";
import {ResultCodesEnum} from "../api/api";

const initialState = {
    postData: [
        {
            id: 3,
            date: '10/20/2019',
            likeCount: 15,
            postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n' +
                'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n' +
                'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n' +
                'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n' +
                'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        },
        {
            id: 2,
            date: '10/20/2019',
            likeCount: 54,
            postText: 'I learn React JS'
        },
        {
            id: 1,
            date: '10/20/2019',
            likeCount: 24,
            postText: "It'style my first post"

        }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string,
    followed: true,
    isUpdateSuccess: false
};

const profileReducer = (state = initialState, action: ProfileActionsTypes): InitialStateType => {
    switch (action.type) {
        case "PORTFOLIO/PROFILE/SET-USER-PROFILE":
        case "PORTFOLIO/PROFILE/SET_PROFILE_STATUS":
        case "PORTFOLIO/PROFILE/UPDATE_PROFILE_DATA_SUCCESS":
            return {
                ...state,
                ...action.payload

            };
        case "PORTFOLIO/PROFILE/ADD-POST":
            let newPost = {
                id: state.postData[0].id + 1,
                date: '10/21/2019',
                likeCount: 0,
                postText: action.post
            };

            return {
                ...state,
                postData: [newPost, ...state.postData],
            };
        case "PORTFOLIO/PROFILE/DELETE_POST":
            return {
                ...state,
                postData: state.postData.filter((post) => post.id != action.postId)
            };
        case "PORTFOLIO/PROFILE/INCREMENTED_LIKE":
            return {
                ...state,
                postData: state.postData.map((post) => {
                    if (post.id == action.postId) {
                        return {...post, likeCount: post.likeCount + 1};
                    } else {
                        return post;
                    }
                })
            };
        case "PORTFOLIO/PROFILE/UPLOAD_PROFILE_PHOTO_SUCCESS":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: {
                        ...action.photos
                    }
                } as ProfileType
            };
        default:
            return state;
    }
};

// actions

export const profileActions = {
    addPost: (post: string) => ({type: 'PORTFOLIO/PROFILE/ADD-POST', post} as const),
    deletePost: (postId: number) => ({type: 'PORTFOLIO/PROFILE/DELETE_POST', postId} as const),
    incrementedLike: (postId: number) => ({type: 'PORTFOLIO/PROFILE/INCREMENTED_LIKE', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'PORTFOLIO/PROFILE/SET-USER-PROFILE', payload: {profile}} as const),
    setProfileStatus: (status: string) => ({type: 'PORTFOLIO/PROFILE/SET_PROFILE_STATUS', payload: {status}} as const),
    uploadProfilePhotoSuccess: (photos: PhotosType) => ({
        type: 'PORTFOLIO/PROFILE/UPLOAD_PROFILE_PHOTO_SUCCESS',
        photos
    } as const),
    updateProfileDataSuccess: (isUpdateSuccess: boolean) => ({
        type: 'PORTFOLIO/PROFILE/UPDATE_PROFILE_DATA_SUCCESS',
        payload: {isUpdateSuccess}
    } as const)
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
    dispatch(appActions.uploadInProgress(true));
    let photos = await profileApi.uploadProfilePhoto((photoFile));

    dispatch(profileActions.uploadProfilePhotoSuccess(photos));
    dispatch(authActions.setProfileData(photos, getState().auth.login));
    dispatch(appActions.uploadInProgress(false));
};

export const updateProfileData = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
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

type InitialStateType = typeof initialState;
type ProfileActionsTypes = InferActionsTypes<typeof profileActions>;
type ThunkType = CommonThunkType<ProfileActionsTypes | FormAction | AuthActionsTypes | AppActionsTypes>

export default profileReducer;