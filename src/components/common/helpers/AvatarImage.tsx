import React from "react";
import defaultAvatar from '../../../assets/images/user.png';

type PropsType = {
    imgUrl?: string | null
}

const AvatarImage: React.FC<PropsType> = ({imgUrl}) => {
    return <img src={imgUrl || defaultAvatar} alt="avatar"/>
};

export default AvatarImage;
