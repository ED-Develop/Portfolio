import React from "react";
import style from './ProfileBanner.module.css';
import defaultAvatar from '../../../assets/images/user.png';
import {CameraOutlined} from "@ant-design/icons/lib";
import {Button} from "antd";
import {TUploadModal} from "../ProfileContainer";

type PropsType = {
    avatar: string | null
    isMyProfile: boolean
    setIsUploadModal: (type: TUploadModal) => void
}

const ProfileAvatar: React.FC<PropsType> = ({avatar, setIsUploadModal, isMyProfile}) => {
    const handleClick = () => setIsUploadModal('avatar');

    return (
        <div className={style.profile__avatar}>
            <img src={avatar || defaultAvatar} alt="avatar"/>
            {isMyProfile && <Button icon={<CameraOutlined/>} onClick={handleClick}/>}
        </div>
    )
};

export default ProfileAvatar;
