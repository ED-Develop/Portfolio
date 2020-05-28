import React, {FC} from 'react';
import style from './Post.module.css';
import {PostType} from "../../../../types/types";
import like from '../../../../assets/images/reactions_like.png';
import love from '../../../../assets/images/reactions_love.png';
import Statistic from "./Statistic";
import Comments from "./Comments/Comments";
import {Tooltip} from "antd";
import PostHeading from "./PostHeading";
import PostContent from "./PostContent";

type PropsType = {
    post: PostType,
    deletePost: (postId: string) => void
    changePostLike: (postId: string) => void
    avatar: string
    login: string | null
    isMyProfile: boolean
    userId: number | null
}

const Post: FC<PropsType> = ({post, deletePost, changePostLike, login, avatar, userId}) => {
    const onDeletePost = () => deletePost(post.postId || '');
    const onIncrementLike = () => changePostLike(post.postId);

    return (
        <div className={style.posts_post}>
            <PostHeading
                date={post.date}
                photo={post.user.photos.small}
                user={post.user.fullName}
                isPostOwner={userId === post.user.id}
                onDeletePost={onDeletePost}
            />
            <PostContent content={post.content}/>
            <div className={style.feedback}>
                <div className={style.like}>
                    <Tooltip title='Like'>
                        <button className={style.likeBtn} onClick={onIncrementLike}>
                            <img src={like} alt="like"/>
                        </button>
                    </Tooltip>
                    <img src={love} alt="love"/>
                    <span>{post.statistic.liked.length}</span>
                </div>
                <p>{post.statistic.comments} Comments</p>
            </div>
            <Statistic statistic={post.statistic}/>
            <Comments comments={post.comments} avatar={avatar} userId={userId}/>
        </div>
    );
};

export default Post;
