import React from "react";
import style from "./Comments.module.css";
import PopUpMenu from "../../../../common/PopUpMenu/PopUpMenu";
import {BugOutlined, DeleteOutlined, EditOutlined, LikeOutlined} from "@ant-design/icons/lib";
import {Comment} from "antd";
import {TPostComment} from "../../../../../types/types";
import {findReply} from "../../../../../utils/helpers";

type PropsType = {
    comment: TPostComment
    userId: number | null
    postId: string
    deleteComment: (postId: string, commentId: string) => void
    startEditing: (commentContent: TPostComment) => void
    replyComment: (userName: string) => void
}

const CustomComment: React.FC<PropsType> = ({comment, userId, deleteComment, postId, startEditing, replyComment}) => {
    const handleDeleteComment = () => deleteComment(postId, comment.id);
    const handleEditComment = () => startEditing(comment);

    const handleReplyComment = () => {
        if (comment.user.fullName) {
            if (comment.user.fullName) replyComment(comment.user.fullName);
        }
    };

    const ownerCommentMenu = (
        <>
            <li onClick={handleEditComment}>
                <EditOutlined className={style.popUpIcon}/>
                Edit
            </li>
            <li className={style.deletePost} onClick={handleDeleteComment}>
                <DeleteOutlined className={style.popUpIcon}/>
                Delete
            </li>
        </>
    );

    const commentMenu = (
        <>
            <li><BugOutlined className={style.popUpIcon}/> Complain</li>
        </>
    );

    const commentContent = findReply(comment.content);
    return (
        <Comment
            content={
                <div className={style.contentContainer}>
                    <div className={style.content}>
                        <h5 className={style.user}>{comment.user.fullName}</h5>
                        <p>
                            {commentContent.reply && <strong>{commentContent.reply}</strong>}
                            {commentContent.content}
                        </p>
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
                    <span className={style.replay} onClick={handleReplyComment}>Replay</span>,
                    <span className={style.date}>{comment.date}</span>
                ]
            }
        />
    )
};

export default CustomComment;
