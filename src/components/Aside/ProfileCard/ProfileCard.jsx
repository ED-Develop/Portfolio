import React from 'react';
import style from './ProfileCard.module.css';
import defaultAvatar from '../../../assets/images/user.png';

const ProfileCard = ({avatar, login}) => {
    return (
        <div className={style.card}>
            <img className={style.profileAvatar} src={avatar || defaultAvatar} alt="avatar"/>
            <a href='#'>{login}</a>
            <div className={style.followers}><img src="http://накруткаподписчиков.рф/images/photo.jpg " alt="followers"/>1,223 followers</div>
        </div>
    );
};

export default ProfileCard;