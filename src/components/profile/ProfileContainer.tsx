import React, {useEffect, useState} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {
    getProfileStatus,
    getUserProfile,
    updateProfileStatus,
    uploadProfilePhoto
} from '../../redux/profile/profile-reducer';
import {startDialogs} from '../../redux/dialogs/dialog-reducer';
import {TProfileModel} from '../../types/types';
import {AppStateType} from '../../redux/store';
import {useProfileId} from '../../hook/useProfileId';

type MapStatePropsType = {
    profile: TProfileModel | null
    myId: number | null
    isFetching: boolean
    status: string
    isAuth: boolean
    isUpload: boolean
    isUpdateSuccess: boolean
    isSuccess: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getProfileStatus: (userId: number) => void
    updateProfileStatus: (status: string) => void
    uploadProfilePhoto: (photoFile: any) => void
    startDialogs: (userId: number) => void
}

export type TUploadModal = 'avatar' | 'banner' | null;
type PropsType = MapStatePropsType & MapDispatchPropsType;

const ProfileContainer: React.FC<PropsType> = ({getUserProfile, getProfileStatus, myId, ...props}) => {
    const {userId, isMyProfile} = useProfileId(myId);

    const [isUploadModal, setIsUploadModal] = useState<TUploadModal>(null);

    const loadProfile = (userId: number) => {
        getUserProfile(userId);
        getProfileStatus(userId);
    };

    const uploadPhoto = (file: File) => {
        const key = isUploadModal === 'avatar'
            ? 'uploadProfilePhoto'
            : null;

        if (key) props[key](file);
    }

    useEffect(() => {
        if (userId) loadProfile(userId);
    }, [userId]);


    useEffect(() => {
        if (!props.isUpload) setIsUploadModal(null);
    }, [props.isUpload]);

    if (props.isFetching || !props.profile) return null;

    return <Profile
        uploadPhoto={uploadPhoto}
        startDialogs={props.startDialogs}
        updateProfileStatus={props.updateProfileStatus}
        status={props.status}
        isAuth={props.isAuth}
        userId={userId}
        isMyProfile={isMyProfile}
        profile={props.profile}
        isUpload={props.isUpload}
        isUploadModal={isUploadModal}
        setIsUploadModal={setIsUploadModal}
    />
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profile.profile,
    myId: state.auth.userId,
    isFetching: state.app.isFetching,
    status: state.profile.status,
    isAuth: state.auth.isAuth,
    isUpload: state.app.isUpload,
    isUpdateSuccess: state.profile.isUpdateSuccess,
    isSuccess: state.app.isSuccess
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    getUserProfile,
    getProfileStatus,
    updateProfileStatus,
    uploadProfilePhoto,
    startDialogs
})(ProfileContainer);
