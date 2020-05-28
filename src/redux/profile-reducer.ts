import {appActions, AppActionsTypes} from "./app-reducer";
import {authActions, AuthActionsTypes, getOwnerProfileData} from "./auth-reducer";
import {arrayPush, FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType, TPostFormData} from "../types/types";
import {CommonThunkType, InferActionsTypes} from "./store";
import {profileApi} from "../api/profile-api";
import {ResultCodesEnum} from "../api/api";
import {postApi, postStorage, TCreatePostPayload} from "../api/firebase/posts-api";

const initialState = {
    postData: [] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string,
    followed: false,
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
            return {
                ...state,
                postData: [action.post, ...state.postData],
            };
        case "PORTFOLIO/PROFILE/DELETE_POST":
            return {
                ...state,
                postData: state.postData.filter((post) => post.postId !== action.postId)
            };
        case "PORTFOLIO/PROFILE/CHANGE_POST_LIKE":
            return {
                ...state,
                postData: state.postData.map((post) => {
                    if (post.postId === action.payload.postId) {
                        return {
                            ...post,
                            statistic: {
                                ...post.statistic,
                                liked: [...action.payload.liked]
                            }
                        };
                    }
                    return post;
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
        case "PORTFOLIO/PROFILE/SET-POSTS":
            return {
                ...state,
                postData: [...action.payload]
            };
        default:
            return state;
    }
};

// actions

export const profileActions = {
    addPost: (post: PostType) => ({type: 'PORTFOLIO/PROFILE/ADD-POST', post} as const),
    deletePostSuccess: (postId: string) => ({type: 'PORTFOLIO/PROFILE/DELETE_POST', postId} as const),
    changeLikeSuccess: (liked: Array<number>, postId: string) => ({
        type: 'PORTFOLIO/PROFILE/CHANGE_POST_LIKE',
        payload: {
            liked,
            postId
        }
    } as const),
    setUserProfile: (profile: ProfileType) => ({
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
    setPosts: (posts: Array<PostType>) => ({type: 'PORTFOLIO/PROFILE/SET-POSTS', payload: posts} as const),
};

// thunks

export const addPost = (postContent: TPostFormData): ThunkType => async (dispatch, getState) => {
    const state = getState();

    const newPost: TCreatePostPayload = {
        date: new Date().toLocaleDateString(),
        user: {
            fullName: state.auth.login,
            id: state.auth.userId,
            photos: state.auth.photos,
        },
        content: {
            text: postContent.text,
            photos: postContent.photos,
        },
        statistic: {
            liked: [],
            comments: 0,
            shared: 0,
            saved: 0
        },
        comments: []
    };

    /*const response = await postApi.create<TCreatePostPayload, TCreatePostResponse>(newPost);

    dispatch(profileActions.addPost({postId: response.name, ...newPost}));*/
};

export const uploadFile = (file: File): ThunkType => async (dispatch) => {
    const fileLink = await postStorage.upload(file);
    dispatch(arrayPush('myPost', 'photos', fileLink));
};

export const getPosts = (): ThunkType => async (dispatch) => {
    const posts = await postApi.getPosts() as Array<PostType>;
    dispatch(profileActions.setPosts(posts));
};

export const deletePost = (postId: string): ThunkType => async (dispatch) => {
    const response = await postApi.delete(postId);

    if (response === null) {
        dispatch(profileActions.deletePostSuccess(postId));
    }
};

export const changePostLike = (postId: string): ThunkType => async (dispatch, getState) => {
    const state = getState();
    const userId = state.auth.userId;
    const currentPost = state.profile.postData.find(post => post.postId === postId);

    if (userId && currentPost) {
        let liked: Array<number>;

        if (!currentPost.statistic.liked.includes(userId)) {
            liked = [...currentPost.statistic.liked, userId];
        } else {
            liked = currentPost.statistic.liked.filter(id => id !== userId);
        }

        const response = await postApi.changeLike(liked, postId);

        dispatch(profileActions.changeLikeSuccess(response.liked || [], postId));
    }
};

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
