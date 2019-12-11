import React from 'react';
import style from './User.module.css';
import {NavLink} from "react-router-dom";
import defaultAvatar from '../../../../assets/images/user.png'

const User = ({id, avatarUrl, unFollow, follow, name,followingInProgress,status, followed}) => {
    let onFollow = () => {
        follow(id);
    };

    let onUnfollow = () => {
        unFollow(id);
    };
    return (
        <div className={style.user}>
            <div className={style.userAvatar}>
                <img src= {avatarUrl || defaultAvatar}  alt="avatar"/>
            </div>
            <div className={style.userDescription}>
                <div className={style.info}>
                    <NavLink className={style.name} to={`/profile/${id}/about`}>{name}</NavLink>
                    <p>{status}</p>
                </div>
                <div>
                    {followed
                        ? <button disabled={followingInProgress.some(idInArr => idInArr === id)} onClick={onUnfollow}>Unfollow</button>
                        : <button disabled={followingInProgress.some(idInArr => idInArr === id)} onClick={onFollow}>Follow</button>}
                </div>
            </div>
        </div>
    )
};

export default User;