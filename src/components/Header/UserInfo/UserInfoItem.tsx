import React from "react";
import style from "./UserInfo.module.css";

type PropsType = {
    icon: string
    isAvatar?: boolean
}

const UserInfoItem: React.FC<PropsType> = ({icon, isAvatar}) => {
    return (
        <div className={`${style.userInfoItem} ${isAvatar && style.userAvatar}`}>
            <img className={style.userInfoImage} src={icon} alt="icon"/>
        </div>
    )
};

export default UserInfoItem;
