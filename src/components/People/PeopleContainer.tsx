import React, {ComponentType, FC, useEffect} from 'react';
import {connect} from "react-redux";
import {follow, getAllUsers, getFriends, getUsers, unFollow, userActions} from "../../redux/users/users-reducer";
import {AppStateType} from "../../redux/store";
import {TUserModel} from "../../types/types";
import {
    getCount,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getStartPage,
    getTotalCount,
    getUsersData
} from "../../redux/users/users-selector";
import People from "./People";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";

const {setPageSize} = userActions;

type MapStatePropsType = {
    usersData: Array<TUserModel>
    count: number
    currentPage: number
    startPage: number
    totalCount: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    getUsers: (count: number, currentPage: number) => void
    setPageSize: (pageSize: number) => void
    getAllUsers: (count: number, currentPage: number) => void
    getFriends: (count: number, currentPage: number) => void
}

enum PeopleFilterEnum {
    New = 'new',
    Friends = 'friends'
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<{ filter: PeopleFilterEnum }>;

const PeopleContainer: FC<PropsType> = (props) => {
    const {match, history, location, staticContext, ...restProps} = props;
    const filter: PeopleFilterEnum = match.params.filter;

    const getUsers = (filter: string, pageSize: number, currentPage: number) => {
        if (filter === PeopleFilterEnum.New) {
            props.getUsers(pageSize, currentPage);
        } else if (filter === PeopleFilterEnum.Friends) {
            props.getFriends(pageSize, currentPage);
        } else {
            props.getAllUsers(pageSize, currentPage);
        }
    }

    useEffect(() => {
        getUsers(filter, props.count, props.currentPage);
    }, []);

    useEffect(() => {
        getUsers(filter, props.count, props.currentPage);
    }, [filter]);

    const getCurrentPageUsers = (currentPage: number) => getUsers(filter, props.count, currentPage);

    const changePageSize = (currentPage: number, pageSize: number) => {
        getUsers(filter, pageSize, currentPage);
        props.setPageSize(pageSize);
    };

    if (props.isFetching) return null;

    return <People
        {...restProps}
        getCurrentPageUsers={getCurrentPageUsers}
        changePageSize={changePageSize}
    />
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    usersData: getUsersData(state),
    count: getCount(state),
    currentPage: getCurrentPage(state),
    startPage: getStartPage(state),
    totalCount: getTotalCount(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
});

export default compose<ComponentType>(withRouter, connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    {
        follow,
        getUsers,
        getAllUsers,
        unFollow,
        setPageSize,
        getFriends,
    }))(PeopleContainer);
