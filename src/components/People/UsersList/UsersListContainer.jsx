import React from 'react';
import {connect} from 'react-redux';
import {
    follow, getUsers,
    unFollow
} from "../../../Redux/UsersReducer";
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


class UserListContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.count, this.props.currentPage);
    }

    onSetCurrentPage = (currentPage) => {
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

let mapStateToProps = (state) => {
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

export default compose(connect(mapStateToProps, {follow, unFollow, getUsers}))(UserListContainer);