import React, {FC} from 'react';
import style from './User.module.css';
import {NavLink} from "react-router-dom";
import defaultAvatar from '../../../../assets/images/user.png'
import {TUserModel} from "../../../../types/types";
import {Button, Col} from "antd";
import PopUpMenu from "../../../common/PopUpMenu/PopUpMenu";
import {DeleteOutlined, MailOutlined, PlusOutlined} from "@ant-design/icons/lib";

type PropsType = {
    user: TUserModel
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: Array<number>
}

const User: FC<PropsType> = ({user, follow, unFollow, followingInProgress}) => {
    const onFollow = () => follow(user.id);
    const onUnfollow = () => unFollow(user.id);

    const popUpMenuItems = [
        <Button type='link'><MailOutlined/> Send Message</Button>,
        user.followed
            ? (
                <Button
                    className={style.removeBtn}
                    type='link'
                    onClick={onUnfollow}
                    disabled={followingInProgress.some(idInArr => idInArr === user.id)}
                >
                    <DeleteOutlined/> Remove From Friends
                </Button>
            )
            : (
                <Button
                    type='link'
                    onClick={onFollow}
                    disabled={followingInProgress.some(idInArr => idInArr === user.id)}
                >
                    <PlusOutlined/> Add To Friends
                </Button>
            ),
    ];

    return (
        <Col span={8}>
            <div className={style.user}>
                <div className={style.userAvatar}>
                    <img src={user.photos.large || defaultAvatar} alt="avatar"/>
                </div>
                <div className={style.userDescription}>
                    <div className={style.info}>
                        <NavLink className={style.name} to={`/profile/${user.id}/timeline`}>{user.name}</NavLink>
                        <p>{user.status}</p>
                    </div>
                    <PopUpMenu placement='bottomRight' buttons={popUpMenuItems}/>
                </div>
            </div>
        </Col>
    )
};

export default User;
