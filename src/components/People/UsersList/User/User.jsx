import React from 'react';
import style from './User.module.css';
import {NavLink} from "react-router-dom";
import defaultAvatar from '../../../../assets/images/user.png'
import profilePhoto from '../../../../assets/images/profilePhoto.jpg'

const User = ({id, avatarUrl, unFollow, follow, name,followingInProgress,status, followed}) => {
    let onFollow = () => {
        follow(id);
    };

    let onUnfollow = () => {
        unFollow(id);
    };
    return (
        <div className={style.user}>
            <div className={style.userHeader}>
                <img src={profilePhoto} className={style.logo} alt="logo"/>
                <img src= {avatarUrl || defaultAvatar} className={style.avatar} alt="avatar"/>
            </div>
            <div className={style.userBody}>
                <NavLink className={style.name} to={`/profile/${id}/about`}>{name}</NavLink>
                {followed
                    ? <button disabled={followingInProgress.some(idInArr => idInArr === id)} onClick={onUnfollow}>Unfollow</button>
                    : <button disabled={followingInProgress.some(idInArr => idInArr === id)} onClick={onFollow}>Follow</button>}
                <p>{status}</p>
            </div>
        </div>
    )
};

export default User;