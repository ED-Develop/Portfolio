import React, {FC, useState} from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";
import MyPostForm, {PostsFormPropsType} from "./PostsForm/PostsForm";
import defaultAvatar from '../../../assets/images/user.png';
import {TPostFormData, TPostModel} from "../../../types/types";
import {Col} from "antd";
import {PostsPropsType} from "./PostsContainer";
import {Dispatch} from "redux";
import {DecoratedFormProps} from "redux-form/lib/reduxForm";

const Posts: FC<PostsPropsType> = React.memo((
    {changePostLike, deletePost, postData, addPost, avatar, isMyProfile, firstName, userId, uploadFile, ...props}) => {
    const [editingPost, setEditingPost] = useState<TPostModel | null>(null);
    const [isInputFocus, toggleIsInputFocus] = useState(false);

    const startEditing = (post: TPostModel) => {
        if (!editingPost || editingPost.postId !== post.postId) {
            setEditingPost(post);
        }

        toggleIsInputFocus(true);
    };

    const disableInputFocus = () => toggleIsInputFocus(false);

    const onSubmit = (
        formData: TPostFormData,
        dispatch: Dispatch,
        props: DecoratedFormProps<TPostFormData, PostsFormPropsType>
    ) => {
        if (props.form) {
            addPost(formData, props.form);
        }
    };

    return (
        <Col span={15} className={style.container}>
            {isMyProfile && <div className={style.inputField}>
                <MyPostForm
                    onSubmit={onSubmit}
                    avatar={avatar}
                    firstName={firstName}
                    uploadFile={uploadFile}
                    uploadedFiles={props.uploadedFiles}
                    removeUploadedFile={props.removeUploadedFile}
                    cancelUploading={props.cancelUploading}
                    deleteFile={props.deleteFile}
                    isInputFocus={isInputFocus}
                    disableInputFocus={disableInputFocus}
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
                        startEditing={startEditing}
                    />
                ))
            }
        </Col>
    );
});

export default Posts;
