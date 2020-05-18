import React, {FC} from 'react';
import style from './ProfileCard.module.css';
import defaultAvatar from '../../../assets/images/user.png';
import followersIcon from '../../../assets/images/People.png';

type PropsType = {
    avatar: string | null
    login: string | null
}

const ProfileCard: FC<PropsType> = ({avatar, login}) => {
    return (
        <div className={style.card}>
            <img className={style.profileAvatar} src={avatar || defaultAvatar} alt="avatar"/>
            <a href='#'>{login}</a>
            <div className={style.followers}>
                <img src={followersIcon} alt="followers"/>1,223 followers
            </div>
        </div>
    );
};

export default ProfileCard;
