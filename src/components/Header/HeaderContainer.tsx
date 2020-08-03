import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth/auth-reducer";
import {AppStateType} from "../../redux/store";
import {cashSelectedItem, restoreSearchList, searchActions, searchItems} from "../../redux/search/search-reducer";
import {TUserModel} from "../../types/types";
import {reset} from "redux-form";

const {setSearchString} = searchActions;

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    avatar: string | null
    searchResults: Array<TUserModel>
    isSearchFetching: boolean
    searchString: string
    userName: string | null
    userStatus: string | null
}

type MapDispatchPropsType = {
    logout: () => void
    searchItems: (string: string, next?: boolean) => void,
    restoreSearchList: () => void
    cashSelectedItem: (item: TUserModel) => void
    setSearchString: (string: string) => void
    reset: (formName: string) => void
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
    searchResults: state.search.searchItems,
    isSearchFetching: state.search.isSearchFetching,
    searchString: state.search.searchString,
    userName: state.auth.login,
    userStatus: state.auth.status
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    {logout, searchItems, restoreSearchList, cashSelectedItem, setSearchString, reset})(HeaderContainer);
