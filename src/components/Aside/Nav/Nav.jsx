import React from 'react';
import style from './Nav.module.css';
import Item from "./Item/Item";

const Nav = () => {
    return (
        <nav className={style.nav}>
            <ul className={style.navbar}>
                <Item name='Profile' icon='https://cdn2.iconfinder.com/data/icons/lightly-icons/30/user-480.png'
                      href={`/profile`}/>
                <Item name='Messages' icon='https://cdn0.iconfinder.com/data/icons/40-lined-icons-2/100/23_mail-512.png'
                      href='/messages'/>
                <Item name='People' icon='http://download.seaicons.com/icons/custom-icon-design/silky-line-user/512/users-2-icon.png' href='/people'/>
                <Item name='Projects' icon='https://image.flaticon.com/icons/png/512/25/25402.png' href='/projects'/>
            </ul>
        </nav>
    )
};

export default Nav;