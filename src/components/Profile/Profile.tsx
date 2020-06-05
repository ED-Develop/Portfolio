import React, {FC, useState} from 'react';
import style from "./Profile.module.css";
import Preloader from "../common/Preloader/Preloader";
import PostsContainer from "./Posts/PostsContainer";
import ModalWindow from "../common/ModalWindow/ModalWindow";
import {TProfileModel} from "../../types/types";
import ProfileBanner from "./ProfileBanner/ProfileBanner";
import ProfileTitle from "./ProfileTitle/ProfileTitle";
import ProfileNavigation from "./Navigation/ProfileNavigation";
import {Redirect, Route, Switch} from "react-router-dom";

type PropsType = {
    profile: TProfileModel
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
            <Switch>
                <Redirect exact from='/profile' to='/profile/timeline'/>
                <Route path='/profile/:userId?/timeline'
                       render={() => <PostsContainer isMyProfile={props.isMyProfile}/>}/>
            </Switch>

        </div>
    )
};

export default Profile;
