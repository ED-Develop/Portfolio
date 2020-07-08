import {TPostComment, TPostContent, TPostFormData, TPostModel, TUploadedFile} from "../../types/types";
import {CommonThunkType, InferActionsTypes} from "../store";
import {arrayPush, arrayRemove, destroy, FormAction, formValueSelector} from "redux-form";
import {AppActionsTypes} from "../app-reducer";
import {
    postApi,
    postStorage,
    TCreateCommentPayload,
    TCreatePostPayload,
    TCreateResponse
} from "../../api/firebase/posts-api";
import {parseContent, updateObjectInArray} from "../../utils/helpers";
import {validateForm} from "../common";

const initialState = {
    postData: [] as Array<TPostModel>,
    uploadedFiles: [] as Array<TUploadedFile>
};

const timelineReducer = (state = initialState, action: TimelineActionsTypes): TTimelineInitialState => {
    switch (action.type) {
        case "PORTFOLIO/PROFILE/ADD-POST":
            return {
                ...state,
                postData: [action.post, ...state.postData],
            };
        case "PORTFOLIO/PROFILE/EDIT_POST_SUCCESS":
            return {
                ...state,
                postData: updateObjectInArray<TPostModel, string>(
                    state.postData,
                    action.payload.postId,
                    "postId",
                    {content: action.payload.content}
                )
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
        case "PORTFOLIO/PROFILE/ADD_COMMENT_SUCCESS":
            return {
                ...state,
                postData: state.postData.map(post => {
                    if (post.postId === action.payload.postId) {
                        return {
                            ...post,
                            comments: [...post.comments, action.payload.comment],
                            statistic: {
                                ...post.statistic,
                                comments: ++post.comments.length
                            }
                        };
                    }
                    return post;
                })
            };
        case "PORTFOLIO/PROFILE/CHANGE_COMMENT_SUCCESS":
            const {commentId, content} = action.payload;
            return {
                ...state,
                postData: state.postData.map(post => {
                    if (post.postId === action.payload.postId) {
                        return {
                            ...post,
                            comments: updateObjectInArray<TPostComment, string>(
                                post.comments,
                                commentId,
                                "id",
                                {content}
                            )
                        };
                    }

                    return post;
                })
            };
        case "PORTFOLIO/PROFILE/DELETE_COMMENT_SUCCESS":
            return {
                ...state,
                postData: state.postData.map(post => {
                    if (post.postId === action.payload.postId) {
                        return {
                            ...post,
                            comments: post.comments.filter(comment => comment.id !== action.payload.commentId),
                            statistic: {
                                ...post.statistic,
                                comments: --post.comments.length
                            }
                        };
                    }

                    return post;
                })
            };
        case "PORTFOLIO/PROFILE/TOGGLE_DISABLED_COMMENTS_SUCCESS":
            const {postId, isDisabled} = action.payload;

            return {
                ...state,
                postData: updateObjectInArray<TPostModel, string>(
                    state.postData,
                    postId,
                    "postId",
                    {isDisabledComments: isDisabled}
                )
            };
        default:
            return state;
    }
};

export const timelineActions = {
    addPost: (post: TPostModel) => ({type: 'PORTFOLIO/PROFILE/ADD-POST', post} as const),
    editPostSuccess: (content: TPostContent, postId: string) => ({
        type: 'PORTFOLIO/PROFILE/EDIT_POST_SUCCESS',
        payload: {content, postId}
    } as const),
    deletePostSuccess: (postId: string) => ({type: 'PORTFOLIO/PROFILE/DELETE_POST', postId} as const),
    changeLikeSuccess: (liked: Array<number>, postId: string) => ({
        type: 'PORTFOLIO/PROFILE/CHANGE_POST_LIKE',
        payload: {
            liked,
            postId
        }
    } as const),
    setPosts: (posts: Array<TPostModel>) => ({type: 'PORTFOLIO/PROFILE/SET-POSTS', payload: posts} as const),
    pushUploadedFile: (uploadedFile: TUploadedFile) => ({
        type: 'PORTFOLIO/PROFILE/PUSH_UPLOADED_FILE',
        payload: {uploadedFile}
    } as const),
    removeUploadedFile: (fileName: string) => ({
        type: 'PORTFOLIO/PROFILE/REMOVE_UPLOADED_FILE',
        payload: {fileName}
    } as const),
    addCommentSuccess: (postId: string, comment: TPostComment) => ({
        type: 'PORTFOLIO/PROFILE/ADD_COMMENT_SUCCESS',
        payload: {postId, comment}
    } as const),
    changeCommentSuccess: (postId: string, commentId: string, content: string) => ({
        type: 'PORTFOLIO/PROFILE/CHANGE_COMMENT_SUCCESS',
        payload: {postId, commentId, content}
    } as const),
    deleteCommentSuccess: (postId: string, commentId: string) => ({
        type: 'PORTFOLIO/PROFILE/DELETE_COMMENT_SUCCESS',
        payload: {postId, commentId}
    } as const),
    toggleDisabledCommentsSuccess: (postId: string, isDisabled: boolean) => ({
        type: 'PORTFOLIO/PROFILE/TOGGLE_DISABLED_COMMENTS_SUCCESS',
        payload: {postId, isDisabled}
    } as const)
};

// thunks

export const addPost = (postData: TPostFormData, formName: string): ThunkType => async (dispatch, getState) => {
    debugger
    if (validateForm(() => !(!postData.photos.length && !postData.text), formName, dispatch)) {
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
            isDisabledComments: false,
            comments: []
        };

        const response = await postApi.create<TCreatePostPayload, TCreateResponse>(newPost);

        dispatch(timelineActions.addPost({postId: response.name, ...newPost}));
    }
};

export const editPost = (postContent: TPostContent, formName: string, postId: string): ThunkType => async (dispatch) => {
    if (validateForm(
        () => !(!postContent.photos && !postContent.text && !postContent.video
            || postContent.photos && !postContent.photos.length && !postContent.text && !postContent.video),
        formName,
        dispatch
    )) {
        let content = postContent;

        if (!postContent.video) {
            content = {...parseContent(postContent.text), photos: postContent.photos};
        }

        const result = await postApi.editPost(content, postId);

        if (result) {
            dispatch(timelineActions.editPostSuccess(result.content, postId));
        }
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
    const posts = await postApi.getPosts() as Array<TPostModel>;
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

export const addComment = (postId: string, content: string, formName: string): ThunkType => {
    return async (dispatch, getState) => {
        if (validateForm(() => !!content, formName, dispatch)) {
            const state = getState();

            const newComment: TCreateCommentPayload = {
                content,
                user: {
                    id: state.auth.userId,
                    fullName: state.auth.login,
                    photos: state.auth.photos,
                },
                date: new Date().toLocaleDateString()
            };

            const result = await postApi.createComment(newComment, postId);

            if (result) {
                dispatch(timelineActions.addCommentSuccess(postId, {id: result.name, ...newComment}));
            }
        }
    };
};

export const editComment = (postId: string, content: string, formName: string, commentId: string): ThunkType => {
    return async (dispatch) => {
        if (validateForm(() => !!content, formName, dispatch)) {
            const result = await postApi.editComment<string>(content, postId, commentId);

            if (result) {
                dispatch(timelineActions.changeCommentSuccess(postId, commentId, result.content));
            }
        }
    };
};

export const deleteComment = (postId: string, commentId: string): ThunkType => async (dispatch) => {
    const result = await postApi.deleteComment(postId, commentId);

    if (result === null) {
        dispatch(timelineActions.deleteCommentSuccess(postId, commentId));
    }
};

export const toggleDisabledComments = (postId: string, isDisabled: boolean): ThunkType => async (dispatch) => {
    const result = await postApi.toggleDisabledComments(isDisabled, postId);

    if (result) {
        dispatch(timelineActions.toggleDisabledCommentsSuccess(postId, result.isDisabledComments));
    }
};

export type TTimelineInitialState = typeof initialState;
type TimelineActionsTypes = InferActionsTypes<typeof timelineActions>;
type ThunkType = CommonThunkType<TimelineActionsTypes | FormAction | AppActionsTypes>

export default timelineReducer;
