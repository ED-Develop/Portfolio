import React from "react";
import style from "./Post.module.css";
import defaultAvatar from "../../../../assets/images/user.png";
import PopUpMenu from "../../../common/PopUpMenu/PopUpMenu";
import {BugOutlined, DeleteOutlined, DisconnectOutlined, EditOutlined, ShareAltOutlined} from "@ant-design/icons/lib";
import {TPostModel} from "../../../../types/types";

type PropsType = {
    user: string | null
    date: string | number
    photo: string | null
    postId: string
    isDisabledComments: boolean
    isPostOwner: boolean
    onDeletePost: () => void
    toggleDisabledComments: (postId: string, isDisabled: boolean) => void
    startEditing: () => void
}

const PostHeading: React.FC<PropsType> = ({user, date, photo, isPostOwner, onDeletePost, isDisabledComments, ...props}) => {
    const handleDisableComments = () => props.toggleDisabledComments(props.postId, true);
    const handleEnableComments = () => props.toggleDisabledComments(props.postId, false);

    return (
        <div className={style.heading}>
            <div className={style.userInfo}>
                <img src={photo || defaultAvatar} alt="Avatar"/>
                <div>
                    <h3>{user}</h3>
                    <p>{date}</p>
                </div>
            </div>
            <PopUpMenu placement='bottomRight'>
                {
                    isPostOwner
                        ? <>
                            <li><ShareAltOutlined className={style.popUpIcon}/> Share</li>
                            <li onClick={props.startEditing}>
                                <EditOutlined className={style.popUpIcon}/>
                                Edit
                            </li>
                            {
                                isDisabledComments
                                    ? <li onClick={handleEnableComments}>
                                        <DisconnectOutlined className={style.popUpIcon}/>
                                        Enable comments
                                    </li>
                                    : <li onClick={handleDisableComments}>
                                        <DisconnectOutlined className={style.popUpIcon}/>
                                        Disable comments
                                    </li>
                            }
                            <li className={style.deletePost} onClick={onDeletePost}>
                                <DeleteOutlined className={style.popUpIcon}/> Delete
                            </li>
                        </>
                        : <>
                            <li><ShareAltOutlined className={style.popUpIcon}/> Share</li>
                            <li><BugOutlined className={style.popUpIcon}/> Complain</li>
                        </>
                }
            </PopUpMenu>
        </div>
    )
};

export default PostHeading;
