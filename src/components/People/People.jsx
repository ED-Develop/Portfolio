import React from 'react';
import style from './People.module.css';
import Search from "../common/Search/Search";
import UserListContainer from "./UsersList/UsersListContainer";

const People = () => {
    return (
        <div className={style.container}>
            <Search placeholder='Search user'/>
            <UserListContainer/>
        </div>
    )
};

export default People;