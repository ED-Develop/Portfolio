import React, {FC, useMemo} from 'react';
import style from './Logo.module.scss';
import {NavLink} from "react-router-dom";
import logo from '../../../assets/images/logo.png'
import logoSmall from '../../../assets/images/logo-small.png'
// @ts-ignore
import Burger from 'react-css-burger';
import {url} from '../../../utils/routeManager';

type PropsType = {
    toggleIsAsideCollapsed: () => void
    isAsideCollapsed: boolean
}

const Logo: FC<PropsType> = ({toggleIsAsideCollapsed, isAsideCollapsed}) => {
    const logoImage = useMemo(() => isAsideCollapsed ? logoSmall : logo, [isAsideCollapsed]);

    return (
        <div className={`${style.logo} ${isAsideCollapsed ? style.logo_small : ''}`}>
            <Burger
                active={!isAsideCollapsed}
                burger="arrow"
                color="#b5b5b5"
                hoverOpacity={0.8}
                scale={0.7}
                style={{margin: 0, marginRight: '15px'}}
                onClick={toggleIsAsideCollapsed}
            />
            <NavLink to={url('base')}><img src={logoImage} alt="Logo"/></NavLink>
        </div>
    )
};

export default Logo;
