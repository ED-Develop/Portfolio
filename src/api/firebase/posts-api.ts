import {FirebaseAPI, TFirebaseCreateResponse} from './firebase';
import {TPostModel, TPostComment, TPostContent} from "../../types/types";
import StorageAPI from "./storage";

export type TCreatePostPayload = Omit<TPostModel, 'postId' & { postId?: string }>
export type TCreateCommentPayload = Omit<TPostComment, 'id' & { id?: string }>
type TGetPost = Omit<TCreatePostPayload, 'comments'> & { comments: { [key: string]: TPostComment } }

type TGetPostResponse = {
    [key: string]: TGetPost
}

type TChangeLike = {
    liked: Array<number> | []
}

type TEditCommentResponse = {
    content: string
}

type TToggleDisabledComment = {
    isDisabledComments: boolean
}

type TEditPost = {
    content: TPostContent
}

class PostsApi extends FirebaseAPI {
    constructor() {
        super('/posts');
    }

    getPosts() {
        return this.get<TGetPostResponse>().then(posts => {
            return Object.keys(posts)
                .map(key => {
                    const comments: Array<TPostComment> = posts[key].comments
                        ? Object.keys(posts[key].comments)
                            .map(commentId => ({
                                ...posts[key].comments[commentId],
                                id: commentId,
                            }))
                        : [];

                    return {
                        ...posts[key],
                        postId: key,
                        statistic: {
                            ...posts[key].statistic,
                            liked: posts[key].statistic.liked || [],
                            comments: comments ? comments.length : 0,
                        },
                        comments
                    }
                })
                .reverse() as Array<TPostModel>
        })
    }

    editPost(content: TPostContent, postId: string) {
        return this.update<TEditPost, TEditPost>({content}, `/${postId}`);
    }

    changeLike(payload: Array<number>, postId: string) {
        return this.update<{}, TChangeLike>({liked: payload}, `${postId}/statistic`);
    }

    createComment(comment: TCreateCommentPayload, postId: string) {
        return this.create<TCreateCommentPayload, TFirebaseCreateResponse>(comment, `${postId}/comments/`);
    }

    editComment<P>(content: P, postId: string, commentId: string) {
        return this.update<{ content: P }, TEditCommentResponse>({content}, `${postId}/comments/${commentId}`);
    }

    deleteComment(postId: string, commentId: string) {
        return this.delete(`${postId}/comments/${commentId}`);
    }

    toggleDisabledComments(isDisabledComments: boolean, postId: string) {
        return this.update<TToggleDisabledComment, TToggleDisabledComment>({isDisabledComments}, `/${postId}`);
    }
}

export const postStorage = new StorageAPI('posts');

export const postApi = new PostsApi();
