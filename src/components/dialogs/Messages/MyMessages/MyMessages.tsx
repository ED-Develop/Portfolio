import React, {FC} from 'react';
import style from './MyMessages.module.css';
import defaultAvatar from '../../../../assets/images/user.png';

type PropsType = {
    message: any
    avatar: string | null
    login: string | null
}

const MyMessages: FC<PropsType> = ({message, avatar, login}) => {
    return (
        <div className={style.message}>
            <div className={style.content}>
                <div className={style.info}>
                    <span className={style.name}>{login}</span>
                    <span className={style.date}>{message.date}</span>
                </div>
                <p>{message.message}</p>
            </div>
            <img className={style.avatar} src={avatar || defaultAvatar} alt="avatar"/>
        </div>
    );
};

export default MyMessages;