import React, {FC} from 'react';
import style from './People.module.css';
import Search from "../common/Search/Search";
import UserListContainer from "./UsersList/UsersListContainer";
import {connect} from "react-redux";
import {searchUsers} from "../../redux/users/users-reducer";
import {AppStateType} from "../../redux/store";

type MapDispatchPropsType = {
    searchUsers: (userName: string) => void
}

const PeopleContainer: FC<MapDispatchPropsType> = (props) => {
    const onSearch = (formData: any) => {
        props.searchUsers(formData.search);
    };

    return (
        <div className={style.container}>
            <Search onSubmit={onSearch} placeholder='Search user'/>
            <UserListContainer/>
        </div>
    )
};


export default connect<{}, MapDispatchPropsType, {}, AppStateType>(() => ({}),
    {searchUsers})(PeopleContainer);
