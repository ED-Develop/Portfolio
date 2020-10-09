import React, {CSSProperties} from 'react';
import style from '../Auth.module.scss';
import logo from '../../../assets/images/logo-light.png';
import {Layout} from 'antd';
import banner from '../../../assets/images/login-banner.jpg';
import {NavLink} from 'react-router-dom';

const {Content} = Layout;

export const Banner = () => {
    const styles: CSSProperties = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${banner})`
    };

    const links = [
        {path: '/', title: 'About'},
        {path: '/', title: 'Contact'},
    ];

    return (
        <Content className={style.landing__banner} style={styles}>
                <div className={style.logo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={style.title}>
                    <h1>Make your life more interesting with Socialite Social Network</h1>
                </div>
                <ul className={style.nav}>
                    {
                        links.map(link => (
                            <li key={link.title}>
                                <NavLink to={link.path}>{link.title}</NavLink>
                            </li>
                        ))
                    }
                </ul>
        </Content>
    )
};
