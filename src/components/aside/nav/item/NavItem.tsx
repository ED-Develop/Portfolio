import React, {FC} from 'react';
import style from '../Nav.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    icon: string
    href: string
    collapsed: boolean
}

const NavItem: FC<PropsType> = ({href, icon, name, collapsed}) => {
    return (
        <li className={style.item}>
            <NavLink
                to={href}
                activeClassName={style.activeLink}
                className={`${style.item__link} ${collapsed && style.item__link_small}`}
            >
                <img src={icon} alt="icon"/>
                {!collapsed && name}
            </NavLink>
        </li>
    )
};

export default NavItem;
