import React, {FC} from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";
import MyPostForm from "./PostsForm/PostsForm";
import defaultAvatar from '../../../assets/images/user.png';
import {PostType, TPostFormData} from "../../../types/types";
import {Col} from "antd";

type PropsType = {
    addPost: (post: TPostFormData) => void
    deletePost: (postId: string) => void
    changePostLike: (postId: string) => void
    postData: Array<PostType>
    avatar: string | null
    isMyProfile: boolean
    firstName: string | null
    userId: number | null
    uploadFile: (file: File) => void
}

const Posts: FC<PropsType> = React.memo((
    {changePostLike, deletePost, postData, addPost, avatar, isMyProfile, firstName, userId, uploadFile}) => {
    const onSubmit = (formData: TPostFormData) => {
        console.log(formData);
        addPost(formData)
    };

    return (
        <Col span={15} className={style.container}>
            {isMyProfile && <div className={style.inputField}>
                <MyPostForm onSubmit={onSubmit} avatar={avatar} firstName={firstName} uploadFile={uploadFile}/>
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
