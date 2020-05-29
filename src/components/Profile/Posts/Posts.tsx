import React, {FC} from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";
import MyPostForm, {PostsFormPropsType} from "./PostsForm/PostsForm";
import defaultAvatar from '../../../assets/images/user.png';
import {PostType, TPostFormData} from "../../../types/types";
import {Col} from "antd";
import {PostsPropsType} from "./PostsContainer";
import {Dispatch} from "redux";
import {DecoratedFormProps} from "redux-form/lib/reduxForm";

const Posts: FC<PostsPropsType> = React.memo((
    {changePostLike, deletePost, postData, addPost, avatar, isMyProfile, firstName, userId, uploadFile, ...props}) => {
    const onSubmit = (formData: TPostFormData, dispatch: Dispatch, props: DecoratedFormProps<TPostFormData, PostsFormPropsType>) => {
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
                />
            </div>}
            {
                postData.map((post: PostType) => (
                    <Post
                        key={post.postId}
                        isMyProfile={isMyProfile}
                        avatar={avatar || defaultAvatar}
                        login={firstName}
                        post={post}
                        changePostLike={changePostLike}
                        deletePost={deletePost}
                        userId={userId}
                    />
                ))
            }
        </Col>
    );
});

export default Posts;
