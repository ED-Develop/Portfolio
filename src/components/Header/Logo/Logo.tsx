import React, {FC} from 'react';
import style from './Logo.module.css';
import {NavLink} from "react-router-dom";
import logo from '../../../assets/images/logo.png'
// @ts-ignore
import Burger from 'react-css-burger';

type PropsType = {
    toggleIsAsideCollapsed: () => void
    isAsideCollapsed: boolean
}

const Logo: FC<PropsType> = ({toggleIsAsideCollapsed, isAsideCollapsed}) => {
    return (
        <div className={style.logo}>
            <Burger
                active={!isAsideCollapsed}
                burger="arrow"
                color="#b5b5b5"
                hoverOpacity={0.8}
                scale={0.7}
                style={{margin: 0, marginRight: '15px'}}
                onClick={toggleIsAsideCollapsed}
            />
            <NavLink to="/"><img src={logo} alt="Logo"/></NavLink>
        </div>
    )
};

export default Logo;
