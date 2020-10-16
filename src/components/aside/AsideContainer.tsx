import React from 'react';
import Aside from "./Aside";
import {connect} from "react-redux";
import {getFriends} from "../../redux/aside/aside-reducer";
import {AppStateType} from "../../redux/store";

type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {
    getFriends: () => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
});

const AsideContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    {getFriends})(Aside);

export default AsideContainer;
