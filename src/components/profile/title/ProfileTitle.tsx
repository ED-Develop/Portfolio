import React from "react";
import style from './ProfileTitle.module.css';
import ProfileStatus from "./ProfileStatus";

type PropsType = {
    fullName: string
    status: string
    isMyProfile: boolean
    updateProfileStatus: (status: string) => void
}

const ProfileTitle:React.FC<PropsType> = ({fullName, status, updateProfileStatus, isMyProfile}) => {
    return (
        <div className={style.profile__title}>
            <h1>{fullName}</h1>
            <ProfileStatus isMyProfile={isMyProfile} status={status} updateProfileStatus={updateProfileStatus}/>
        </div>
    )
};

export default ProfileTitle;
