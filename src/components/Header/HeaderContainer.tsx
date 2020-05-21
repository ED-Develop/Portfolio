import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/store";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    avatar: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

type OwnProps = {
    toggleIsAsideCollapsed: () => void
    isAsideCollapsed: boolean
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

class HeaderContainer extends React.Component<PropsType> {
 render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    avatar: state.auth.photos.small
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    {logout})(HeaderContainer);
