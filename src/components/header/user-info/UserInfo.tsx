import React from "react";
import style from "./UserInfo.module.css";
import UserInfoItem from "./UserInfoItem";
import bell from '../../../assets/images/bell.svg';
import chat from '../../../assets/images/chat.svg';
import defaultAvatar from '../../../assets/images/user.png';
import UserMenu from "./UserMenu/UserMenu";

type PropsType = {
    avatar: string | null
    userName: string | null
    userStatus: string | null
    logout: () => void
}

const UserInfo: React.FC<PropsType> = ({avatar, userStatus, userName, logout}) => {
    const infoItems = [
        {id: 0, icon: chat},
        {id: 1, icon: bell},
        {
            id: 2,
            icon: avatar ? avatar : defaultAvatar,
            isAvatar: true,
            content: {
                Component: UserMenu,
                props: {userName, avatar, userStatus, logout}
            }
        }
    ];

    return (
        <div className={style.userInfo}>
            {infoItems.map(item => (
                <UserInfoItem
                    key={item.id}
                    icon={item.icon}
                    isAvatar={item.isAvatar}
                    content={item.content}
                />
            ))}
        </div>
    )
};


export default UserInfo;
