import {PostType, TPostFormData, TUploadedFile} from "../../types/types";
import {CommonThunkType, InferActionsTypes} from "../store";
import {arrayPush, arrayRemove, destroy, FormAction, formValueSelector, stopSubmit} from "redux-form";
import {AppActionsTypes} from "../app-reducer";
import {postApi, postStorage, TCreatePostPayload, TCreatePostResponse} from "../../api/firebase/posts-api";
import {parseContent} from "../../utils/helpers";

const initialState = {
    postData: [] as Array<PostType>,
    uploadedFiles: [] as Array<TUploadedFile>
};

const timelineReducer = (state = initialState, action: TimelineActionsTypes): InitialStateType => {
    switch (action.type) {
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
        case "PORTFOLIO/PROFILE/SET-POSTS":
            return {
                ...state,
                postData: [...action.payload]
            };
        case "PORTFOLIO/PROFILE/PUSH_UPLOADED_FILE":
            return {
                ...state,
                uploadedFiles: [...state.uploadedFiles, action.payload.uploadedFile]
            };
        case "PORTFOLIO/PROFILE/REMOVE_UPLOADED_FILE":
            return {
                ...state,
                uploadedFiles: state.uploadedFiles.filter(file => file.fileName !== action.payload.fileName)
            };
        default:
            return state;
    }
};

export const timelineActions = {
    addPost: (post: PostType) => ({type: 'PORTFOLIO/PROFILE/ADD-POST', post} as const),
    deletePostSuccess: (postId: string) => ({type: 'PORTFOLIO/PROFILE/DELETE_POST', postId} as const),
    changeLikeSuccess: (liked: Array<number>, postId: string) => ({
        type: 'PORTFOLIO/PROFILE/CHANGE_POST_LIKE',
        payload: {
            liked,
            postId
        }
    } as const),
    setPosts: (posts: Array<PostType>) => ({type: 'PORTFOLIO/PROFILE/SET-POSTS', payload: posts} as const),
    pushUploadedFile: (uploadedFile: TUploadedFile) => ({
        type: 'PORTFOLIO/PROFILE/PUSH_UPLOADED_FILE',
        payload: {uploadedFile}
    } as const),
    removeUploadedFile: (fileName: string) => ({
        type: 'PORTFOLIO/PROFILE/REMOVE_UPLOADED_FILE',
        payload: {fileName}
    } as const)
};

// thunks

export const addPost = (postData: TPostFormData, formName: string): ThunkType => async (dispatch, getState) => {
    if (!postData.photos.length && !postData.text) {
        dispatch(stopSubmit(formName, {_error: 'Empty post content'}));
    } else {
        const state = getState();
        const postContent = parseContent(postData.text);

        const newPost: TCreatePostPayload = {
            date: new Date().toLocaleDateString(),
            user: {
                fullName: state.auth.login,
                id: state.auth.userId,
                photos: state.auth.photos,
            },
            content: {
                text: postContent.text,
                photos: postData.photos,
                video: postContent.video
            },
            statistic: {
                liked: [],
                comments: 0,
                shared: 0,
                saved: 0
            },
            comments: []
        };

        const response = await postApi.create<TCreatePostPayload, TCreatePostResponse>(newPost);

        dispatch(timelineActions.addPost({postId: response.name, ...newPost}));
    }
};

export enum UploadStatus {
    Success,
    Failed,
    InProgress
}

export const uploadFile = (file: File): ThunkType => async (dispatch) => {
    const fileLink = await postStorage.upload(file);

    if (typeof fileLink === 'string') {
        dispatch(arrayPush('myPost', 'photos', fileLink));
        dispatch(timelineActions.pushUploadedFile({
            fileName: file.name,
            status: UploadStatus.Success,
            fileUrl: fileLink
        }));
    } else {
        dispatch(timelineActions.pushUploadedFile({
            fileName: file.name,
            status: UploadStatus.Failed,
            fileUrl: ''
        }));
    }
};

export const deleteFile = (urlFile: string): ThunkType => async () => {
    await postStorage.delete(urlFile);
};

export const cancelUploading = (formName: string, fieldName: string, urlFile?: string): ThunkType => {
    return async (dispatch, getState) => {
        const reduxFormFilesValue = formValueSelector(formName)(getState(), fieldName) as Array<string>;

        if (urlFile) {
            const indexOfDeletingFile = reduxFormFilesValue.findIndex(file => file === urlFile);
            dispatch(arrayRemove(formName, fieldName, indexOfDeletingFile));
            dispatch(deleteFile(urlFile));
        } else {
            reduxFormFilesValue.forEach(urlFile => {
                dispatch(deleteFile(urlFile));
            });

            dispatch(destroy(formName));
        }
    };
};

export const getPosts = (): ThunkType => async (dispatch) => {
    const posts = await postApi.getPosts() as Array<PostType>;
    dispatch(timelineActions.setPosts(posts));
};
export const deletePost = (postId: string): ThunkType => async (dispatch, getState) => {
    const response = await postApi.delete(postId);

    if (response === null) {
        const postPhotos = getState().timeline.postData.find(post => post.postId === postId)?.content.photos;

        postPhotos?.forEach(photo => dispatch(deleteFile(photo)));
        dispatch(timelineActions.deletePostSuccess(postId));
    }
};

export const changePostLike = (postId: string): ThunkType => async (dispatch, getState) => {
    const state = getState();
    const userId = state.auth.userId;
    const currentPost = state.timeline.postData.find(post => post.postId === postId);

    if (userId && currentPost) {
        let liked: Array<number>;

        if (!currentPost.statistic.liked.includes(userId)) {
            liked = [...currentPost.statistic.liked, userId];
        } else {
            liked = currentPost.statistic.liked.filter(id => id !== userId);
        }

        const response = await postApi.changeLike(liked, postId);

        dispatch(timelineActions.changeLikeSuccess(response.liked || [], postId));
    }
};

type InitialStateType = typeof initialState;
type TimelineActionsTypes = InferActionsTypes<typeof timelineActions>;
type ThunkType = CommonThunkType<TimelineActionsTypes | FormAction | AppActionsTypes>

export default timelineReducer;
