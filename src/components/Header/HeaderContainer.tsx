import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/store";
import {searchItems} from "../../redux/search/search-reducer";
import {TUserModel} from "../../types/types";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    avatar: string | null
    searchResults: Array<TUserModel>
}

type MapDispatchPropsType = {
    logout: () => void
    searchItems: (string: string) => void
}

type OwnProps = {
    toggleIsAsideCollapsed: () => void
    isAsideCollapsed: boolean
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

const HeaderContainer: React.FC<PropsType> = (props) => {
    return <Header {...props}/>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    avatar: state.auth.photos.small,
    searchResults: state.search.searchItems
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    {logout, searchItems})(HeaderContainer);
