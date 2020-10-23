import React, {ComponentType, FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {follow, getAllUsers, getFriends, getUsers, unFollow, userActions} from '../../redux/users/users-reducer';
import {AppStateType} from '../../redux/store';
import {TUserModel} from '../../types/types';
import {
    selectCount,
    selectCurrentPage,
    selectFollowingInProgress,
    selectStartPage,
    selectTotalCount,
    selectUsers
} from '../../redux/users/users-selector';
import People from './People';
import {useParams, useHistory} from 'react-router-dom';
import {compose} from 'redux';
import {selectIsFetching} from '../../redux/app/app-selectors';
import {url} from '../../utils/routeManager';
import * as queryString from 'querystring';
import {useQuery} from '../../hook/useQuery';

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

export enum PeopleFilterEnum {
    New = 'new',
    Friends = 'friends',
    All = 'all'
}

type TParams = {
    filter?: PeopleFilterEnum
}

type TQuery = {
    page?: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const PeopleContainer: FC<PropsType> = (props) => {
    const history = useHistory();
    const query = useQuery<TQuery>();
    const filter: PeopleFilterEnum = useParams<TParams>().filter || PeopleFilterEnum.All;
    const [initialized, setInitialized] = useState(false);

    const getUsers = (filter: PeopleFilterEnum, pageSize: number, currentPage: number = 1) => {
        const {getFriends, getUsers, getAllUsers} = props;

        const actions: { [key in PeopleFilterEnum]: any } = {
            [PeopleFilterEnum.Friends]: getFriends,
            [PeopleFilterEnum.New]: getUsers,
            [PeopleFilterEnum.All]: getAllUsers
        }

        actions[filter](pageSize, currentPage);
    }

    const getPageNumber = () => initialized ? 1 : (query.page ? +query.page : props.currentPage);

    useEffect(() => {
        if (!initialized) setInitialized(true);

        getUsers(filter, props.count, getPageNumber());
    }, [filter]);

    const setCurrentPageToUrl = (currentPage: number) => {
        history.push({
            pathname: url('people', getParams(filter)),
            search: queryString.stringify(getQuery(currentPage))
        });
    };

    useEffect(() => {
        setCurrentPageToUrl(props.currentPage);
    }, [props.currentPage]);

    const getQuery = (page: number): TQuery => page > 1 ? {page: String(page)} : {};
    const getParams = (filter: PeopleFilterEnum) => ({filter: filter === PeopleFilterEnum.All ? null : filter});

    const handlePageChanged = (currentPage: number) => getUsers(filter, props.count, currentPage);

    const changePageSize = (currentPage: number, pageSize: number) => {
        getUsers(filter, pageSize, currentPage);
        props.setPageSize(pageSize);
    };

    if (props.isFetching) return null;

    return <People
        {...props}
        handlePageChanged={handlePageChanged}
        changePageSize={changePageSize}
    />
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    usersData: selectUsers(state),
    count: selectCount(state),
    currentPage: selectCurrentPage(state),
    startPage: selectStartPage(state),
    totalCount: selectTotalCount(state),
    isFetching: selectIsFetching(state),
    followingInProgress: selectFollowingInProgress(state)
});

export default compose<ComponentType>(connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    {
        follow,
        getUsers,
        getAllUsers,
        unFollow,
        setPageSize,
        getFriends,
    }))(PeopleContainer);
