import React, {FC} from 'react';
import s from './MyPost.module.css';
import Post from "./Post/Post";
import MyPostForm from "./MyPostForm/MyPostForm";
import defaultAvatar from '../../../assets/images/user.png';
import {PostType} from "../../../types/types";

type PropsType = {
    addPost: (post: string) => void
    deletePost: (postId: number) => void
    incrementedLike: (postId: number) => void
    postData: Array<PostType>
    avatar?: string | null
    login: string | null
    isMyProfile: boolean
}

const MyPost: FC<PropsType> = React.memo((
    {incrementedLike, deletePost,postData,addPost,avatar, login, isMyProfile}) => {
    let postElements = postData
        .map( (post: PostType) => <Post key={post.id} isMyProfile={isMyProfile}  avatar={avatar || defaultAvatar}
                                        login={login} post={post} incrementedLike={incrementedLike}
                                        deletePost={deletePost}/>);

    let onSubmit = (formData: any) => {
        addPost(formData.post);
    };
    return (
        <div className={s.container}>
            {isMyProfile && <div className={s.inputField}>
                <img className={s.avatar} src={avatar || defaultAvatar}
                     alt="avatar"/>
                <MyPostForm onSubmit={onSubmit}/>
            </div>}

            {postElements}

        </div>
    );
});
export default MyPost;