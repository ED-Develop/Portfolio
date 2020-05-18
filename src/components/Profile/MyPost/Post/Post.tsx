import React, {FC} from 'react';
import s from './Post.module.css'
import {PostType} from "../../../../types/types";

type PropsType = {
    post: PostType,
    deletePost: (postId: number) => void
    incrementedLike: (postId: number) => void
    avatar: string
    login: string | null
    isMyProfile: boolean
}

const Post: FC<PropsType> = ({post, deletePost, incrementedLike, login, avatar, isMyProfile}) => {
    const onDeletePost = () => deletePost(post.id);

    const onIncrementedLike = () => incrementedLike(post.id);

    return (
        <div className={s.post}>
            <div className={s.info}>
                <h3>{login}</h3>
                <p>{post.date}</p>
            </div>
            <div className={s.postWraper}>
                <div className={s.avatar}>
                    <img src={avatar} alt="avatar"/>
                </div>
                <div className={s.postContent}>
                    {isMyProfile && <div onClick={onDeletePost} className={s.delete}>&times;</div>}
                    <div className={s.description}>
                        <div>
                            <h3><a href="#">{login}</a></h3>
                            <div className={s.activity}>2 min ago</div>
                        </div>
                        <div className={s.like}>
                            <img
                                onClick={onIncrementedLike}
                                src="https://www.rubbishclearancebournemouth.co.uk/img/green-facebook-thumbs-up.png"
                                alt="like"
                            />
                            <span>{post.likeCount}</span>
                        </div>
                    </div>
                    <p className={s.postText}>
                        {post.postText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Post;
