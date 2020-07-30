import React, {FC} from 'react';
import PostsContainer from "./Posts/PostsContainer";
import {TProfileModel} from "../../types/types";
import ProfileBanner from "./ProfileBanner/ProfileBanner";
import ProfileTitle from "./ProfileTitle/ProfileTitle";
import ProfileNavigation from "./Navigation/ProfileNavigation";
import {Redirect, Route, Switch} from "react-router-dom";
import UploadModal from "./ProfileBanner/UploadModal";
import {TUploadModal} from "./ProfileContainer";

type PropsType = {
    profile: TProfileModel
    isUpload: boolean
    userId: number | null
    status: string
    isAuth: boolean
    isMyProfile: boolean
    followed: boolean
    uploadPhoto: (photo: File) => void
    startDialogs: (userId: number) => void
    updateProfileStatus: (status: string) => void
    isUploadModal: 'avatar' | 'banner' | null
    setIsUploadModal: (type: TUploadModal) => void
}

const Profile: FC<PropsType> = ({profile, uploadPhoto, isUpload, startDialogs, ...props}) => {
    const hideModalWindow = () => props.setIsUploadModal(null);

    return (
        <div>
            {props.isUploadModal && (
                <UploadModal
                    isUpload={isUpload}
                    handleOk={hideModalWindow}
                    handleCancel={hideModalWindow}
                    uploadPhoto={uploadPhoto}
                    entity={props.isUploadModal}
                >
                    <p>
                        {
                            props.isUploadModal === 'avatar'
                                ? 'It will be easier for friends to recognize you if you upload your real photo.'
                                : 'Make your profile more interesting. Just upload banner photo.'
                        }
                    </p>
                    <p>You can upload a JPG, GIF or PNG image.</p>
                </UploadModal>
            )}
            <ProfileBanner
                avatar={profile.photos.large}
                isMyProfile={props.isMyProfile}
                setIsUploadModal={props.setIsUploadModal}
            />
            <ProfileTitle
                fullName={profile.fullName}
                status={props.status}
                isMyProfile={props.isMyProfile}
                updateProfileStatus={props.updateProfileStatus}
            />
            <ProfileNavigation isMyProfile={props.isMyProfile} followed={props.followed}/>
            <Switch>
                <Redirect exact from='/profile' to='/profile/timeline'/>
                <Route
                    path='/profile/:userId?/timeline'
                    render={() => <PostsContainer isMyProfile={props.isMyProfile}/>}
                />
            </Switch>

        </div>
    )
};

export default Profile;
