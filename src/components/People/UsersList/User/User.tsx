import React, {FC} from 'react';
import style from './User.module.css';
import {NavLink} from "react-router-dom";
import defaultAvatar from '../../../../assets/images/user.png'
import {UserType} from "../../../../types/types";

type PropsType = {
    user: UserType
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: Array<number>
}

const User: FC<PropsType> = ({user, follow, unFollow, followingInProgress}) => {
    const onFollow = () => {
        follow(user.id);
    };

    const onUnfollow = () => {
        unFollow(user.id);
    };

    return (
        <div className={style.user}>
            <div className={style.userAvatar}>
                <img src={user.photos.large || defaultAvatar} alt="avatar"/>
            </div>
            <div className={style.userDescription}>
                <div className={style.info}>
                    <NavLink className={style.name} to={`/profile/${user.id}/about`}>{user.name}</NavLink>
                    <p>{user.status}</p>
                </div>
                <div>
                    {
                        user.followed
                            ? <button
                                disabled={followingInProgress.some((idInArr: number) => idInArr === user.id)}
                                onClick={onUnfollow}
                            >
                                Unfollow
                            </button>
                            : <button
                                disabled={followingInProgress.some((idInArr: number) => idInArr === user.id)}
                                onClick={onFollow}
                            >
                                Follow
                            </button>
                    }
                </div>
            </div>
        </div>
    )
};

export default User;
