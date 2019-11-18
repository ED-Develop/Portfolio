import React from 'react';
import style from './Header.module.css'
import Logo from "./Logo/Logo";
import {NavLink} from "react-router-dom";

const Header = ({logout, isAuth}) => {
    let onLogout = (event) => {
        event.preventDefault();
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