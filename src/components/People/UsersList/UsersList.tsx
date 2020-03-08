import React, {FC, useState} from 'react';
import style from './UsersList.module.css';
import User from "./User/User";
import Paginator from "../../common/Paginator/Paginator";
import {UserType} from "../../../types/types";

type PropsType = {
    usersData: Array<UserType>
    count: number
    currentPage: number
    startPage: number
    totalCount: number
    followingInProgress: Array<number>
    onSetCurrentPage: (currentPage: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}


const UserList: FC<PropsType> = ({
                                     usersData, totalCount, count, startPage,
                                     onSetCurrentPage, currentPage, ...props
                                 }) => {
    let [portionSize] = useState(4);

    return (
        <div>
            <Paginator portionSize={portionSize} onSetCurrentPage={onSetCurrentPage} currentPage={currentPage}
                        totalCount={totalCount} count={count}/>
            <div className={style.wrapper}>
                {usersData
                    .map((user) => {
                        return <User key={user.id} user={user} follow={props.follow} unFollow={props.unFollow}
                                     followingInProgress={props.followingInProgress}/>
                    })}
            </div>
        </div>
    )
};


export default UserList;