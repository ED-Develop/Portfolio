import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileStatus, getUserProfile, updateProfileStatus, uploadProfilePhoto} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    state = {
        isMyProfile: false,
        userId: +this.props.match.params.userId || this.props.myId
    };
    toggleIsMyProfile = () => {
        if (+this.state.userId === this.props.myId && !this.state.isMyProfile) {
            this.setState({isMyProfile: true});
        }
    };

    componentDidMount() {
        if (!this.state.userId) {
            this.props.history.push('/login');
        }
        this.props.getUserProfile(this.state.userId);
        this.props.getProfileStatus(this.state.userId);
    };

    componentDidUpdate(prevProps, prevState) {
        this.toggleIsMyProfile();
        if (prevProps.match.params.userId !== this.props.match.params.userId && !this.state.isMyProfile) {
            if (!this.props.myId) {
                this.props.history.push('/login');
            } else {
                this.props.getUserProfile(this.props.myId);
                this.props.getProfileStatus(this.props.myId);
                this.setState({userId: this.props.myId})
            }
        }
    }

    render() {
        if (this.props.isFetching) {
            return <Preloader/>
        } else {
            return <Profile uploadProfilePhoto={this.props.uploadProfilePhoto}
                            updateProfileStatus={this.props.updateProfileStatus} status={this.props.status}
                            isAuth={this.props.isAuth} userId={this.state.userId}
                            isMyProfile={this.state.isMyProfile}
                            profile={this.props.profile} isUpload={this.props.isUpload} followed={this.props.followed}/>
        }
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        myId: state.auth.userId,
        isFetching: state.app.isFetching,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        isUpload: state.app.isUpload,
        followed: state.profilePage.followed
    };
};

export default compose(connect(mapStateToProps, {getUserProfile, getProfileStatus, updateProfileStatus, uploadProfilePhoto}),
    withRouter)(ProfileContainer);