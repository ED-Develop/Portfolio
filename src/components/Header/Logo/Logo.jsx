import React from 'react';
import style from './Logo.module.css';
import {NavLink} from "react-router-dom";

const Logo = () => {
    return (
        <div className={style.logo}>
            <img src="https://www.logogenie.net/download/preview/medium/3589659" alt="Logo"/>
            <span className={style.logo_name}><NavLink to="/">PortFolio</NavLink></span>
        </div>
    )
};

export default Logo;