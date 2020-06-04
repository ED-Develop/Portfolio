import React, {FC} from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";
import MyPostForm, {PostsFormPropsType} from "./PostsForm/PostsForm";
import defaultAvatar from '../../../assets/images/user.png';
import {TPostContent, TPostFormData, TPostModel, TUploadedFile} from "../../../types/types";
import {Col} from "antd";
import {Dispatch} from "redux";
import {DecoratedFormProps} from "redux-form/lib/reduxForm";

type PropsType = {
    postData: Array<TPostModel>
    avatar: string | null
    firstName: string | null
    userId: number | null
    isMyProfile: boolean
    isInputFocus: boolean
    editMode: boolean
    formInitialValue?: TPostContent
    uploadedFiles: Array<TUploadedFile>
    submitForm: (formData: TPostFormData, dispatch: Dispatch, props: DecoratedFormProps<TPostFormData, PostsFormPropsType>) => void
    deletePost: (postId: string) => void
    changePostLike: (postId: string) => void
    uploadFile: (file: File) => void
    removeUploadedFile: (fileName: string) => void
    cancelUploading: (formName: string, fieldName: string, urlFile?: string) => void
    deleteFile: (fileUrl: string) => void
    addComment: (postId: string, content: string, formName: string) => void
    editComment: (postId: string, content: string, formName: string, commentId: string) => void
    deleteComment: (postId: string, commentId: string) => void
    destroy: (formName: string) => void
    toggleDisabledComments: (postId: string, isDisabled: boolean) => void
    disableInputFocus: () => void
    startEditing: (post: TPostModel) => void
    cancelEditing: () => void
    removeEditingPostVideoLink: () => void
}

const Posts: FC<PropsType> = React.memo((
    {changePostLike, deletePost, postData, submitForm, avatar, isMyProfile, firstName, userId, uploadFile, ...props}) => {

    return (
        <Col span={15} className={style.container}>
            {isMyProfile && <div className={style.inputField}>
                <MyPostForm
                    onSubmit={submitForm}
                    avatar={avatar}
                    firstName={firstName}
                    uploadFile={uploadFile}
                    uploadedFiles={props.uploadedFiles}
                    removeUploadedFile={props.removeUploadedFile}
                    cancelUploading={props.cancelUploading}
                    deleteFile={props.deleteFile}
                    isInputFocus={props.isInputFocus}
                    disableInputFocus={props.disableInputFocus}
                    initialValues={props.formInitialValue}
                    editMode={props.editMode}
                    cancelEditing={props.cancelEditing}
                    removeEditingPostVideoLink={props.removeEditingPostVideoLink}
                />
            </div>}
            {
                postData.map((post: TPostModel) => (
                    <Post
                        key={post.postId}
                        isMyProfile={isMyProfile}
                        avatar={avatar || defaultAvatar}
                        post={post}
                        changePostLike={changePostLike}
                        deletePost={deletePost}
                        userId={userId}
                        addComment={props.addComment}
                        deleteComment={props.deleteComment}
                        destroy={props.destroy}
                        editComment={props.editComment}
                        toggleDisabledComments={props.toggleDisabledComments}
                        startEditing={props.startEditing}
                    />
                ))
            }
        </Col>
    );
});

export default Posts;
