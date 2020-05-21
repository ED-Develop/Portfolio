import React, {FC} from 'react';
import style from './Nav.module.css';
import NavItem from "./Item/NavItem";
import profile from '../../../assets/images/home.png';
import chat from '../../../assets/images/chat.png';
import friends from '../../../assets/images/friends.png';
import jobs from '../../../assets/images/bag.png';

type PropsType = {
    collapsed: boolean
}

const Nav: FC<PropsType> = ({collapsed}) => {
    const navItem = [
        {title: 'Profile', href: '/profile', icon: profile},
        {title: 'Messages', href: '/messages', icon: chat},
        {title: 'People', href: '/people', icon: friends},
        {title: 'Projects', href: '/projects', icon: jobs}
    ];

    return (
        <nav className={style.nav}>
            <ul className={style.navbar}>
                {
                    navItem.map(item => (
                        <NavItem
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
