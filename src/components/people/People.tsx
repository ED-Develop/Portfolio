import React, {useMemo} from 'react';
import style from './People.module.scss';
import UserList from './users-list/UsersList';
import {TUserModel} from '../../types/types';
import Heading from './heading/Heading';
import {Pagination} from 'antd';
import {MainLayout} from '../common/layout/main/MainLayout';
import {PeopleFilterEnum} from './PeopleContainer';

type PropsType = {
    isFetching: boolean
    usersData: Array<TUserModel>
    count: number
    currentPage: number
    startPage: number
    totalCount: number
    filter: PeopleFilterEnum
    followingInProgress: Array<number>
    handlePageChanged: (currentPage: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    changePageSize: (pageSize: number, currentPage: number) => void
}

const People: React.FC<PropsType> = ({isFetching, totalCount, currentPage, handlePageChanged, ...props}) => {
    const title = useMemo(() => {
        const titles: { [key in PeopleFilterEnum]: string } = {
            [PeopleFilterEnum.All]: 'All Peoples',
            [PeopleFilterEnum.New]: 'New Peoples',
            [PeopleFilterEnum.Friends]: 'Your Friends'
        }

        return titles[props.filter];
    }, [props.filter]);

    return (
        <MainLayout
            contentClassName={style.container}
            title={title}
        >
            <div>
                <Heading/>
                <UserList
                    follow={props.follow}
                    unFollow={props.unFollow}
                    followingInProgress={props.followingInProgress}
                    usersData={props.usersData}
                />
            </div>
            <div className={style.paginator}>
                <Pagination
                    total={totalCount}
                    current={currentPage}
                    onChange={handlePageChanged}
                    onShowSizeChange={props.changePageSize}
                    pageSizeOptions={['15', '30', '60', '90']}
                    defaultPageSize={props.count}
                />
            </div>
        </MainLayout>
    )
}

export default People;