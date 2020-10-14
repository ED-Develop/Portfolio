import React from "react";
import style from "./TabsNavigation.module.css";
import {NavLink} from "react-router-dom";

type TItem = {
    title: string
    href: string
    exact?: boolean
}

type PropsType = {
    navItems: Array<TItem>
}

const TabsNavigation: React.FC<PropsType> = ({navItems}) => {
    return (
        <div className={style.nav}>
            {navItems.map(item => (
                <NavLink
                    key={item.title}
                    to={item.href}
                    activeClassName={style.activeLink}
                    className={style.link}
                    exact={item.exact}
                >
                    {item.title}
                </NavLink>
            ))}
        </div>
    )
}

export default TabsNavigation;