import React from 'react';
import s from './Post.module.css'

const Post = ({post, deletePost, incrementedLike,login, avatar}) => {
    const onDeletePost = () => {
        deletePost(post.id);
    };
    const onIncrementedLike = () => {
        incrementedLike(post.id);
    };

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
                    <div onClick={onDeletePost} className={s.delete}>x</div>
                    <div className={s.description}>
                        <div>
                            <h3><a href="#">{login}</a></h3>
                            <div className={s.activity}>2 min ago</div>
                        </div>
                        <div className={s.like}>
                            <img onClick={onIncrementedLike} src="https://www.rubbishclearancebournemouth.co.uk/img/green-facebook-thumbs-up.png"
                                 alt="like"/>
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