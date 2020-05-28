import React, {FC, useState} from 'react';
import style from "./Profile.module.css";
import Preloader from "../common/Preloader/Preloader";
import userAvatar from "../../assets/images/user.png";
import ProfileStatus from "./ProfileTitle/ProfileStatus";
import information from "../../assets/images/Information.png";
import edit from "../../assets/images/edit.png";
import work from "../../assets/images/work.png";
import ok from "../../assets/images/OK.png";
import noo from "../../assets/images/noo.png";
import Contacts from "./Contacts/Contacts";
import PostsContainer from "./Posts/PostsContainer";
import ModalWindow from "../common/ModalWindow/ModalWindow";
import {ProfileType} from "../../types/types";
import {NavLink} from "react-router-dom";
import ProfileBanner from "./ProfileBanner/ProfileBanner";
import ProfileTitle from "./ProfileTitle/ProfileTitle";
import ProfileNavigation from "./Navigation/ProfileNavigation";
import {Col, Row} from "antd";

type PropsType = {
    profile: ProfileType
    isUpload: boolean
    userId: number | null
    status: string
    isAuth: boolean
    isMyProfile: any
    followed: boolean

    uploadProfilePhoto: (photo: any) => void
    startDialogs: (userId: number) => void
    updateProfileStatus: (status: string) => void
}

const Profile: FC<PropsType> = ({profile, uploadProfilePhoto, isUpload, startDialogs, ...props}) => {
    let [isModal, setIsModal] = useState(false);

    const showModalWindow = () => {
        setIsModal(true);
    };
    const hideModalWindow = () => {
        setIsModal(false);
    };
    const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            uploadProfilePhoto(e.target.files[0]);
            setIsModal(false);
        }
    };

    const onWriteMessage = () => {
        if (props.userId) {
            startDialogs(props.userId);
        }
    };

    const modalWindow = (
        <ModalWindow
            hideModalWindow={hideModalWindow}
            footerDescription={'If you are having trouble downloading, try choosing a smaller photo.'}
            modalTitle={'Upload new photo'}
        >
            <div>
                <div className={style.modalDescription}>
                    <div>It will be easier for friends to recognize you if you upload your real photo.</div>
                    <div>You can upload a JPG, GIF or PNG image.</div>
                </div>
                <div className={style.inputFile}>
                    <input onChange={onPhotoSelected} type='file'/>
                </div>
            </div>
        </ModalWindow>
    );

    const {photos, fullName} = profile;

    if (!profile) return <Preloader/>;

    return (
        <div>
            {isUpload && <Preloader/>}
            {isModal && modalWindow}
            <ProfileBanner
                avatar={photos.large}
                showModalWindow={showModalWindow}
                isMyProfile={props.isMyProfile}
            />
            <ProfileTitle
                fullName={fullName}
                status={props.status}
                isMyProfile={props.isMyProfile}
                updateProfileStatus={props.updateProfileStatus}
            />
            <ProfileNavigation isMyProfile={props.isMyProfile} followed={props.followed}/>
            <Row>
                <PostsContainer isMyProfile={props.isMyProfile}/>
            </Row>

        </div>
    )
};

export default Profile;
