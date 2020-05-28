import React from "react";
import style from './ProfileBanner.module.css';
import defaultBannerImg from '../../../assets/images/profile-cover.jpg';
import {Button} from "antd";
import {CameraOutlined} from "@ant-design/icons/lib";
import ProfileAvatar from "./ProfileAvatar";

type PropsType = {
    bannerImg?: string
    avatar: string | null
    showModalWindow: () => void
    isMyProfile: boolean
}

const ProfileBanner: React.FC<PropsType> = ({bannerImg, avatar, showModalWindow, isMyProfile}) => {
    return (
        <div className={style.profile__banner}>
            <img src={bannerImg || defaultBannerImg} alt="profile banner"/>
            <ProfileAvatar avatar={avatar} showModalWindow={showModalWindow} isMyProfile={isMyProfile}/>
            {isMyProfile && <Button><CameraOutlined/>Edit</Button>}
        </div>
    )
};

export default ProfileBanner;
