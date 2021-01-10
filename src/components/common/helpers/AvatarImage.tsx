import React from 'react';
import style from './AvatarImage.module.scss';
import cn from 'classnames';
import defaultAvatar from '../../../assets/images/user.png';

type PropsType = {
    imgUrl?: string | null
    className?: string
    type?: 'small' | 'large'
}

const AvatarImage: React.FC<PropsType> = ({imgUrl, className, type = 'small'}) => {
    return (
        <img
            className={cn(className, style.avatar, style[`avatar_${type}`])}
            src={imgUrl || defaultAvatar}
            alt="avatar"
        />
    );
};

export default AvatarImage;
