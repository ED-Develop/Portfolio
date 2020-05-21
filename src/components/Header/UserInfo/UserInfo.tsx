import React, {useState} from "react";
import style from "./UserInfo.module.css";
import UserInfoItem from "./UserInfoItem";
import bell from '../../../assets/images/bell.svg';
import chat from '../../../assets/images/chat.svg';
import defaultAvatar from '../../../assets/images/user.png';

type PropsType = {
    avatar: string | null
}

const UserInfo: React.FC<PropsType> = ({avatar}) => {
    const [infoItems] = useState([
        {id: 0, icon: chat},
        {id: 1, icon: bell},
        {id: 2, icon: avatar ? avatar : defaultAvatar, isAvatar: true}
    ]);

    return (
        <div className={style.userInfo}>
            {infoItems.map(item => <UserInfoItem key={item.id} icon={item.icon} isAvatar={item.isAvatar}/>)}
        </div>
    )
};


export default UserInfo;
