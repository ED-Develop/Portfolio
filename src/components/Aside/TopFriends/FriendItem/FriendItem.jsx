import React from 'react';
import style from './FriendItem.module.css';
import defaultAvatar from '../../../../assets/images/user.png';
import {NavLink} from "react-router-dom";

const FriendItem = (props) => {
    return (
        <div className={`${style.item} ${style.online}`} title={props.name}>
            <NavLink to={`/profile/${props.id}`}>
                <img src={props.avatar || defaultAvatar} alt="avatar"/>
            </NavLink>
        </div>
    );
};

export default FriendItem;