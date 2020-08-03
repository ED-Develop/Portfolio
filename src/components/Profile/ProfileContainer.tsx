import React, {useEffect, useState} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileStatus,
    getUserProfile,
    profileActions,
    updateProfileStatus,
    uploadProfilePhoto
} from "../../redux/profile/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {startDialogs} from "../../redux/dialogs/dialog-reducer";
import {TProfileModel} from "../../types/types";
import {AppStateType} from "../../redux/store";

const {updateProfileDataSuccess} = profileActions;

type MapStatePropsType = {
    profile: TProfileModel | null
    myId: number | null
    isFetching: boolean
    status: string
    isAuth: boolean
    isUpload: boolean
    followed: boolean
    isUpdateSuccess: boolean
    isSuccess: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getProfileStatus: (userId: number) => void
    updateProfileDataSuccess: (isUpdateSuccess: boolean) => void
    updateProfileStatus: (status: string) => void
    uploadProfilePhoto: (photoFile: any) => void
    startDialogs: (userId: number) => void
}

type ParamsType = {
    userId?: string
}

export type TUploadModal = 'avatar' | 'banner' | null;
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<ParamsType>

const ProfileContainer: React.FC<PropsType> = ({getUserProfile, getProfileStatus, myId, ...props}) => {
    const getUserId = () => {
        const paramId = props.match.params.userId;

        return paramId && !isNaN(+paramId) ? +paramId : myId;
    }

    const [isMyProfile, setIsMyProfile] = useState(false);
    const [userId, setUserId] = useState(getUserId());
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
        if (!userId) props.history.push('/login');

        if (userId) loadProfile(userId);

        if (props.isUpdateSuccess) props.updateProfileDataSuccess(false);
    }, []);

    useEffect(() => {
        if (userId) loadProfile(userId);
    }, [userId]);

    useEffect(() => {
        setIsMyProfile(userId === myId);
    }, [userId, myId]);

    useEffect(() => {
        if (isMyProfile && !props.isAuth) props.history.push('/login');
    }, [isMyProfile, props.isAuth]);

    useEffect(() => {
        setUserId(getUserId());
    }, [props.match.params.userId]);

    useEffect(() => {
        if (!props.isUpload) setIsUploadModal(null);
    }, [props.isUpload]);

    if (props.isSuccess) return <Redirect to={`/messages/${userId}`}/>;
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
        followed={props.followed}
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
    followed: state.profile.followed,
    isUpdateSuccess: state.profile.isUpdateSuccess,
    isSuccess: state.app.isSuccess
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    getUserProfile,
    getProfileStatus,
    updateProfileDataSuccess,
    updateProfileStatus,
    uploadProfilePhoto,
    startDialogs
})(withRouter(ProfileContainer));
