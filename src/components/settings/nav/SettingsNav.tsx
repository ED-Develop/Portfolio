import React from 'react';
import style from '../Settings.module.scss';
import {TLink} from '../../../types/types';
import {DeleteOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons/lib';
import {NavLink} from 'react-router-dom';

export const SettingsNav = () => {
    const links: Array<TLink> = [
        {title: 'Profile', href: '/settings', icon: <UserOutlined/>},
        {title: 'Social Links', href: '/settings/links', icon: <SettingOutlined/>},
        {title: 'Delete Account', href: '/settings/delete', icon: <DeleteOutlined/>}
    ]

    return (
        <ul className={style.settings__nav}>
            {links.map(({title, href, icon}) => (
                <li key={href} className={style.settings__navItem}>
                    <NavLink
                        to={href}
                        activeClassName={style.activeItem}
                        exact
                    >
                        <span className={style.icon}>{icon}</span> {title}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}