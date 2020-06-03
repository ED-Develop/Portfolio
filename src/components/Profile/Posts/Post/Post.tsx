import React, {FC} from 'react';
import style from './Post.module.css';
import {TPostModel} from "../../../../types/types";
import like from '../../../../assets/images/reactions_like.png';
import love from '../../../../assets/images/reactions_love.png';
import Statistic from "./Statistic";
import Comments from "./Comments/Comments";
import {Tooltip} from "antd";
import PostHeading from "./PostHeading";
import PostContent from "./PostContent";

type PropsType = {
    post: TPostModel,
    deletePost: (postId: string) => void
    changePostLike: (postId: string) => void
    avatar: string
    isMyProfile: boolean
    userId: number | null
    addComment: (postId: string, content: string, formName: string) => void
    editComment: (postId: string, content: string, formName: string, commentId: string) => void
    deleteComment: (postId: string, commentId: string) => void
    destroy: (formName: string) => void
    toggleDisabledComments: (postId: string, isDisabled: boolean) => void
    startEditing: (post: TPostModel) => void
}

const Post: FC<PropsType> = ({post, deletePost, changePostLike, avatar, userId, addComment, deleteComment, ...props}) => {
    const onDeletePost = () => deletePost(post.postId || '');
    const onIncrementLike = () => changePostLike(post.postId);
    const editPost = () => props.startEditing(post);

    return (
        <div className={style.posts_post}>
            <PostHeading
                date={post.date}
                photo={post.user.photos.small}
                user={post.user.fullName}
                isPostOwner={userId === post.user.id}
                onDeletePost={onDeletePost}
                toggleDisabledComments={props.toggleDisabledComments}
                postId={post.postId}
                isDisabledComments={post.isDisabledComments}
                startEditing={editPost}
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
            {!post.isDisabledComments && (
                <Comments
                    comments={post.comments}
                    avatar={avatar}
                    userId={userId}
                    sendComment={addComment}
                    postId={post.postId}
                    deleteComment={deleteComment}
                    destroy={props.destroy}
                    editComment={props.editComment}
                />
            )}
        </div>
    );
};

export default Post;
