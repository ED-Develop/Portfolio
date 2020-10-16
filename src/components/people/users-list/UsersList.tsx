import React, {FC} from 'react';
import style from './UsersList.module.css';
import User from "./user/User";
import {TUserModel} from "../../../types/types";
import {Row} from "antd";

type PropsType = {
    usersData: Array<TUserModel>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

const UserList: FC<PropsType> = ({usersData, ...props}) => {
    return (
        <Row gutter={30} className={style.wrapper}>
            {
                usersData.map((user) => (
                    <User
                        key={user.id}
                        user={user}
                        follow={props.follow}
                        unFollow={props.unFollow}
                        followingInProgress={props.followingInProgress}
                    />
                ))
            }
        </Row>
    )
};

export default UserList;
