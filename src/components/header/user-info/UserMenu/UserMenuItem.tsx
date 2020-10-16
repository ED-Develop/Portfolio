import React from "react";
import style from "../UserInfo.module.css";
import {NavLink} from "react-router-dom";

export type TUserMenuItem = {
    title: string,
    icon: React.ReactElement
    switcher?: React.ReactElement
    action?: () => void
    path?: string
}

type PropsType = {
    model: TUserMenuItem
    closeDropdown: () => void
}

const UserMenuItem: React.FC<PropsType> = ({model, closeDropdown}) => {
    const handleClick = () => {
        if (model.action) {
            model.action();
        }

        if (model.path) {
            closeDropdown();
        }
    }

    return (
        <li onClick={handleClick} key={model.title} className={style.menuItem}>
            {
                model.path
                    ? <NavLink to={model.path} className={style.btn}>
                        <div className={style.btn__content}>
                            <span className={style.menuIcon}>{model.icon}</span> {model.title}
                        </div>
                    </NavLink>
                    : <div className={style.btn}>
                        <div className={style.btn__content}>
                            <span className={style.menuIcon}>{model.icon}</span> {model.title}
                        </div>
                        {model.switcher}
                    </div>
            }
        </li>
    )
};

export default UserMenuItem;