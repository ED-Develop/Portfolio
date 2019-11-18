import React from 'react';
import style from './Nav.module.css';
import Item from "./Item/Item";

const Nav = () => {
    return (
        <nav className={style.nav}>
            <ul className={style.navbar}>
                <Item name='Profile' icon='https://cdn1.iconfinder.com/data/icons/avatar-1-2/512/User2-512.png' href={`/profile/about`}/>
                <Item name='Messages' icon='https://cdn0.iconfinder.com/data/icons/40-lined-icons-2/100/23_mail-512.png' href='/messages/1'/>
                <Item name='People' icon='https://image.flaticon.com/icons/png/512/33/33308.png' href='/people'/>
                <Item name='Music' icon='https://image.flaticon.com/icons/png/512/122/122320.png' href='/music'/>
            </ul>
        </nav>
    )
};

export default Nav;