import React, {Component, ComponentType} from 'react';
import style from './Edit.module.css';
import {connect} from "react-redux";
import {getUserProfile, updateProfileData} from "../../redux/profile-reducer";
import {Redirect} from "react-router-dom";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import Preloader from "../common/Preloader/Preloader";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/store";
import EditForm from "./EditForm";

type MapStatePropsType = {
    isUpdateSuccess: boolean
    profile: ProfileType | null
    userId: number | null
}

type MapDispatchPropsType = {
    updateProfileData: (profileData: ProfileType) => void
    getUserProfile: (userId: number) => void
}

type Auth = {
    isAuth: boolean
}

type PropsType = MapStatePropsType & MapDispatchPropsType & Auth;

type StateType = {
    show: Array<string>
}

class Edit extends Component<PropsType, StateType> {
    state = {
        show: ['main']
    };

    componentDidMount() {
        if (!this.props.profile && this.props.userId) {
            this.props.getUserProfile(this.props.userId);
        }
    }

    onSubmit = (formData: ProfileType) => this.props.updateProfileData(formData);

    showElement = (elementName: string) => {
        this.setState((prevState) => {
            if (prevState.show.some(item => item === elementName)) {
                if (prevState.show.length > 1) {
                    return {
                        show: prevState.show.filter(item => item !== elementName)
                    }
                } else return prevState;
            }
            return {
                show: [...prevState.show, elementName]
            }
        })
    };

    render() {
        const {isUpdateSuccess, profile} = this.props;

        if (isUpdateSuccess) return <Redirect to='/profile/about'/>;

        if (!profile) return <Preloader/>;

        return (
            <div className={style.wrapper}>
                <EditForm
                    show={this.state.show}
                    showElement={this.showElement}
                    initialValues={profile}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isUpdateSuccess: state.profile.isUpdateSuccess,
    profile: state.profile.profile,
    userId: state.auth.userId
});

export default compose<ComponentType>(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, { isAuth: boolean }, AppStateType>(mapStateToProps, {
        getUserProfile,
        updateProfileData
    }),
)(Edit);
