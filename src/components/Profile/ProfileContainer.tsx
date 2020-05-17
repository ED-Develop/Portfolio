import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileStatus,
    getUserProfile,
    profileActions,
    updateProfileStatus,
    uploadProfilePhoto
} from "../../Redux/profileReducer";
import {Redirect, withRouter, RouteComponentProps} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {startDialogs} from "../../Redux/dialogReducer";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../Redux/reduxStore";

const {updateProfileDataSuccess} = profileActions;

type MapStatePropsType = {
    profile: ProfileType | null
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

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<ParamsType>

type StateType = {
    isMyProfile: boolean
    userId: number | null
}

class ProfileContainer extends React.Component<PropsType, StateType> {
    state = {
        isMyProfile: false,
        userId: this.props.match.params.userId ? +this.props.match.params.userId : this.props.myId
    };

    toggleIsMyProfile = () => {
        if (this.state.userId === this.props.myId && !this.state.isMyProfile) {
            this.setState({isMyProfile: true});
        }
    };

    loadProfile = (userId: number) => {
        this.props.getUserProfile(userId);
        this.props.getProfileStatus(userId);
    };

    componentDidMount() {
        if (!this.state.userId) {
            this.props.history.push('/login');
        }

        if (this.state.userId) {
            this.loadProfile(this.state.userId);
        }

        if (this.props.isUpdateSuccess) {
            this.props.updateProfileDataSuccess(false);
        }
    };

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        //load new profile
        if (prevState.userId !== this.state.userId && this.state.userId) {
            this.loadProfile(this.state.userId);
        }

        //determine whose profile it is
        this.toggleIsMyProfile();

        // if logout, redirect to login
        if (this.state.isMyProfile && !this.props.isAuth) {
            this.props.history.push('/login');
        }
        //change state if browser address bar changed
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.setState({userId: this.props.match.params.userId ? +this.props.match.params.userId
                    : this.props.myId});
        }

    }

    render() {
        if (this.props.isSuccess) {
            return <Redirect to={`/messages/${this.state.userId}`}/>
        } else if (this.props.isFetching) {
            return <Preloader/>
        } else {
            return <Profile uploadProfilePhoto={this.props.uploadProfilePhoto} startDialogs={this.props.startDialogs}
                            updateProfileStatus={this.props.updateProfileStatus} status={this.props.status}
                            isAuth={this.props.isAuth} userId={this.state.userId}
                            isMyProfile={this.state.isMyProfile}
                            profile={this.props.profile} isUpload={this.props.isUpload} followed={this.props.followed}/>
        }
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profile.profile,
        myId: state.auth.userId,
        isFetching: state.app.isFetching,
        status: state.profile.status,
        isAuth: state.auth.isAuth,
        isUpload: state.app.isUpload,
        followed: state.profile.followed,
        isUpdateSuccess: state.profile.isUpdateSuccess,
        isSuccess: state.app.isSuccess
    };
};

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, {
    getUserProfile, getProfileStatus, updateProfileDataSuccess,
    updateProfileStatus, uploadProfilePhoto, startDialogs
})(withRouter(ProfileContainer));
