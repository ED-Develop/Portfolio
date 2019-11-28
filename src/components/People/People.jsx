import React from 'react';
import style from './People.module.css';
import Search from "../common/Search/Search";
import UserListContainer from "./UsersList/UsersListContainer";
import {connect} from "react-redux";
import {searchUsers} from "../../Redux/UsersReducer";

const People = (props) => {
    const onSearch = (formData) => {
        props.searchUsers(formData.search);
    };

    return (
        <div className={style.container}>
            <Search onSubmit={onSearch} placeholder='Search user'/>
            <UserListContainer/>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps, {searchUsers})(People);