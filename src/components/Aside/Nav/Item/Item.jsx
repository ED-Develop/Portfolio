import React from 'react';
import style from './Item.module.css';
import {NavLink} from "react-router-dom";

const Item = (props) => {
    return (
        <li className={style.item}>
            <NavLink to={props.href} activeClassName={style.activeLink} className={style.item_link} ><img src={props.icon} alt="icon"/> {props.name} </NavLink>
        </li>
    )
};

export default Item;