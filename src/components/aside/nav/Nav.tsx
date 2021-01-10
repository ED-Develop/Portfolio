import React, {FC} from 'react';
import style from './Nav.module.css';
import NavItem from './item/NavItem';
import profile from '../../../assets/images/home.png';
import chat from '../../../assets/images/chat.png';
import friends from '../../../assets/images/friends.png';
import jobs from '../../../assets/images/bag.png';
import {url} from '../../../utils/routeManager';

type PropsType = {
    collapsed: boolean
}

const Nav: FC<PropsType> = ({collapsed}) => {
    const navItem = [
        {title: 'Profile', href: url('profile', {userId: null}), icon: profile},
        {title: 'Chat', href: url('chat'), icon: chat},
        {title: 'People', href: url<'people'>('people', {filter: null}), icon: friends},
        {title: 'Projects', href: url('projects'), icon: jobs}
    ];

    return (
        <nav className={style.nav}>
            <ul className={style.navbar}>
                {
                    navItem.map(item => (
                        <NavItem
                            key={item.title}
                            name={item.title}
                            icon={item.icon}
                            href={item.href}
                            collapsed={collapsed}
                        />
                    ))
                }
            </ul>
        </nav>
    )
};

export default Nav;
