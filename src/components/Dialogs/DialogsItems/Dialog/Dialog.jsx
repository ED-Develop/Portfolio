import React from 'react';
import style from './Dialog.module.css'
import {NavLink} from "react-router-dom";
import defaultAvatar from '../../../../assets/images/user.png';

const Dialog = (props) => {
    return (
        <div className={style.item}>
            <NavLink to={'/messages/' + props.id} activeClassName={style.active}>
                <div className={style.dialog}>
                    <div>
                        <img src={props.avatar || defaultAvatar} alt="avatar"/>
                    </div>
                    <div className={style.content}>
                        <span className={style.name}>{props.name}</span>
                        <span>{props.date}</span>
                        <p>Online {props.userActivityDate}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};
export default Dialog;