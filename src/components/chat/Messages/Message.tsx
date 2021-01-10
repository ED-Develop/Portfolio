import React from 'react';
import style from './Messages.module.scss';
import cn from 'classnames';

import {TMessageModel} from '../../../types/types';
import AvatarImage from '../../common/helpers/AvatarImage';

type PropsType = TMessageModel;

export const Message: React.FC<PropsType> = ({message, photo, userId, userName}) => {
    const isMyMessage = userId === 2;

    return (
        <div
            className={cn(
                style.message,
                {
                    [style.message_my]: isMyMessage,
                    [style.message_others]: !isMyMessage
                })
            }
        >
            <AvatarImage
                className={style.message__avatar}
                imgUrl={photo}
                type="large"
            />
            <div className={style.message__block}>
                <div className={style.message__userName}>{userName}</div>
                <p className={style.message__text}>{message}</p>
            </div>
        </div>
    );
};
