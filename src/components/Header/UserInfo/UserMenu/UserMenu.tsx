import React, {useState} from "react";
import style from '../UserInfo.module.css';
import AvatarImage from "../../../common/Helpers/AvatarImage";
import {PoweroffOutlined, RocketOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons/lib";
import UserMenuItem, {TUserMenuItem} from "./UserMenuItem";
import {Switch} from "antd";

type PropsType = {
    userName: string | null
    userStatus: string | null
    avatar: string | null
    logout: () => void
    closeDropdown: () => void
}

const UserMenu: React.FC<PropsType> = ({userName, avatar, userStatus, logout, closeDropdown}) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleDarkMode = () => setIsChecked(isChecked => !isChecked);

    const menuModel: Array<TUserMenuItem> = [
        {
            title: 'My profile',
            path: '/profile',
            icon: <UserOutlined/>
        },
        {
            title: 'Account settings',
            path: '/edit',
            icon: <SettingOutlined/>
        },
        {
            title: 'Night mode',
            action: toggleDarkMode,
            icon: <RocketOutlined/>,
            switcher: <Switch checked={isChecked}/>
        },
        {
            title: 'Log out',
            action: logout,
            icon: <PoweroffOutlined/>
        }
    ];

    return (
        <div className={style.userInfo__menu}>
            <div className={style.profileCard}>
                <div className={style.profileCard__avatar}>
                    <AvatarImage imgUrl={avatar}/>
                </div>
                <div>
                    <h3>{userName}</h3>
                    <p>{userStatus}</p>
                </div>
            </div>
            <ul className={style.userMenu}>
                {menuModel.map(model => <UserMenuItem key={model.title} model={model} closeDropdown={closeDropdown}/>)}
            </ul>
        </div>
    )
};

export default UserMenu;