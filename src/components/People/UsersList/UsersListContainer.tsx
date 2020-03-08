import React from 'react';
import {connect} from 'react-redux';
import UserList from './UsersList';
import Preloader from "../../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCount,
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getStartPage,
    getTotalCount,
    getUsersData
} from "../../../Redux/usersSelector";
import {UserType} from "../../../types/types";
import {AppStateType} from "../../../Redux/reduxStore";
import {follow, getUsers, unFollow} from "../../../Redux/usersReducer";

type MapStatePropsType = {
    usersData: Array<UserType>
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
}

type PropsType = MapStatePropsType & MapDispatchPropsType;


class UserListContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.count, this.props.currentPage);
    }

    onSetCurrentPage = (currentPage: number) => {
        this.props.getUsers(this.props.count, currentPage);

    };

    render() {
        return (
            <div>
                {this.props.isFetching && <Preloader/>}
                <UserList usersData={this.props.usersData} count={this.props.count}
                          currentPage={this.props.currentPage} totalCount={this.props.totalCount}
                          follow={this.props.follow} unFollow={this.props.unFollow}
                          onSetCurrentPage={this.onSetCurrentPage}
                          followingInProgress={this.props.followingInProgress}
                          startPage={this.props.startPage}/>
            </div>
        );
    }

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersData: getUsersData(state),
        count: getCount(state),
        currentPage: getCurrentPage(state),
        startPage: getStartPage(state),
        totalCount: getTotalCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};

export default compose(connect<MapStatePropsType, MapDispatchPropsType, any, AppStateType>(mapStateToProps,
    {follow, unFollow, getUsers}))(UserListContainer);