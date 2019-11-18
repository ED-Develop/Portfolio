import React from 'react';
import s from './MyPost.module.css';
import Post from "./Post/Post";
import MyPostForm from "./MyPostForm/MyPostForm";
import defaultAvatar from '../../../assets/images/user.png';



const MyPost = React.memo(({incrementedLike, deletePost,postData,addPost,avatar, login}) => {
    let postElements = postData
        .map(post => <Post  avatar={avatar || defaultAvatar} login={login} post={post} incrementedLike={incrementedLike} deletePost={deletePost}/>);

    let onSubmit = (formData) => {
        addPost(formData.post);
    };
    return (
        <div className={s.container}>
            <div className={s.inputField}>
                <img className={s.avatar} src={avatar || defaultAvatar}
                     alt="avatar"/>
                     <MyPostForm onSubmit={onSubmit}/>
            </div>

            {postElements}

        </div>
    );
});
export default MyPost;