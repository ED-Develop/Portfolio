import React from "react";
import style from './ProfileBanner.module.css';
import defaultAvatar from '../../../assets/images/user.png';
import {CameraOutlined} from "@ant-design/icons/lib";
import {Button} from "antd";

type PropsType = {
    avatar: string | null
    showModalWindow: () => void
    isMyProfile: boolean
}

const ProfileAvatar: React.FC<PropsType> = ({avatar, showModalWindow, isMyProfile}) => {
    return (
        <div className={style.profile__avatar}>
            <img src={avatar || defaultAvatar} alt="avatar"/>
            {isMyProfile && <Button icon={<CameraOutlined/>} onClick={showModalWindow}/>}
        </div>
    )
};

export default ProfileAvatar;
