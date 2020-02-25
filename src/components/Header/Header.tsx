import React, {FC} from 'react';
import style from './Header.module.css'
import Logo from "./Logo/Logo";
import {NavLink} from "react-router-dom";

type PropsType = {
    logout: () => void
    isAuth: boolean
}

const Header: FC<PropsType> = ({logout, isAuth}) => {
    let onLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
    };

    return (
        <header className={style.header}>
            <div className={style.headerContainer}>
                <Logo/>
                <div className={style.auth}>
                    {isAuth
                        ? <a href='#' onClick={onLogout} className={style.login}>Logout</a>
                        : <NavLink className={style.login} to='/login'>Login</NavLink>}
                </div>
            </div>
        </header>
    )
};

export default Header;