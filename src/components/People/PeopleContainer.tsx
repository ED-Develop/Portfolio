import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import {follow, getUsers, unFollow, userActions} from "../../redux/users/users-reducer";
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
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const PeopleContainer: FC<PropsType> = (props) => {
    const {...restProps} = props;

    useEffect(() => {
        props.getUsers(props.count, props.currentPage);
    }, []);

    const getCurrentPageUsers = (currentPage: number) => props.getUsers(props.count, currentPage);

    const changePageSize = (currentPage: number, pageSize: number) => {
        props.getUsers(pageSize, currentPage)
        props.setPageSize(pageSize);
    };

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

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    {
        follow,
        getUsers,
        unFollow,
        setPageSize
    })(PeopleContainer);
