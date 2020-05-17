import React from 'react';
import Aside from "./Aside";
import {connect} from "react-redux";
import {getFriends} from "../../redux/aside-reducer";
import {AppStateType} from "../../redux/store";
import {UserType} from "../../types/types";

type MapStatePropsType = {
    friends: Array<UserType>
    isAuth: boolean
    login: string | null
    avatar: string | null
}

type MapDispatchPropsType = {
    getFriends: () => void
}

type OwnPropsType = any


let mapStateToProps=(state: AppStateType): MapStatePropsType => {
    return {
        friends: state.aside.friends,
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        avatar: state.auth.photos.small
    };
};

const AsideContainer = connect<MapStatePropsType, MapDispatchPropsType,OwnPropsType , AppStateType>(mapStateToProps,
    {getFriends})(Aside);

export default AsideContainer;
