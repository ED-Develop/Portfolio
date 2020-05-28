import React from "react";
import style from './Comments.module.css';
import {Comment} from "antd";
import {TPostComments} from "../../../../../types/types";
import {BugOutlined, DeleteOutlined, EditOutlined, LikeOutlined} from "@ant-design/icons/lib";
import CommentsForm from "./CommentsForm";
import PopUpMenu from "../../../../common/PopUpMenu/PopUpMenu";

type PropsType = {
    comments: Array<TPostComments>
    avatar: string
    userId: number | null
}

const Comments: React.FC<PropsType> = ({comments, avatar, userId}) => {
    const ownerCommentMenu = (
        <>
            <li><EditOutlined className={style.popUpIcon}/> Edit</li>
            <li className={style.deletePost}><DeleteOutlined className={style.popUpIcon}/> Delete</li>
        </>
    );

    const commentMenu = (
        <>
            <li><BugOutlined className={style.popUpIcon}/> Complain</li>
        </>
    );

    return (
        <div className={style.post__comments}>
            <ul className={style.commentsList}>
                {comments && comments.map(comment => (
                    <li key={comment.id} className={style.comment}>
                        <Comment
                            content={
                                <div className={style.contentContainer}>
                                    <div className={style.content}>
                                        <h5 className={style.user}>{comment.user.fullName}</h5>
                                        <p>{comment.content}</p>
                                    </div>
                                    <PopUpMenu placement='topRight'>
                                        {userId === comment.user.id ? ownerCommentMenu : commentMenu}
                                    </PopUpMenu>
                                </div>
                            }
                            avatar={comment.user.photos.small}
                            actions={
                                [
                                    <span className={style.like}><span><LikeOutlined/></span> Like</span>,
                                    <span className={style.replay}>Replay</span>,
                                    <span className={style.date}>{comment.date}</span>
                                ]
                            }
                        />
                    </li>
                ))}
            </ul>
            <CommentsForm avatar={avatar}/>
        </div>
    )
};

export default Comments;
