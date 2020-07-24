import React from "react";
import style from './ProfileBanner.module.css';
import defaultBannerImg from '../../../assets/images/profile-cover.jpg';
import {Button} from "antd";
import {CameraOutlined} from "@ant-design/icons/lib";
import ProfileAvatar from "./ProfileAvatar";
import {TUploadModal} from "../ProfileContainer";

type PropsType = {
    bannerImg?: string
    avatar: string | null
    isMyProfile: boolean
    setIsUploadModal: (type: TUploadModal) => void
}

const ProfileBanner: React.FC<PropsType> = ({bannerImg, avatar, setIsUploadModal, isMyProfile}) => {
    const handleEdit = () => setIsUploadModal('banner');

    return (
        <div className={style.profile__banner}>
            <img src={bannerImg || defaultBannerImg} alt="profile banner"/>
            <ProfileAvatar
                avatar={avatar}
                setIsUploadModal={setIsUploadModal}
                isMyProfile={isMyProfile}
            />
            {isMyProfile && <Button onClick={handleEdit}><CameraOutlined/>Edit</Button>}
        </div>
    )
};

export default ProfileBanner;
