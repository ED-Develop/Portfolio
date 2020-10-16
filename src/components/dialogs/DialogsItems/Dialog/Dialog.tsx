import React, {FC} from 'react';
import style from './Dialog.module.css'
import {NavLink} from "react-router-dom";
import defaultAvatar from '../../../../assets/images/user.png';
import {dateFormatter} from "../../../../utils/dateFormatter";

type PropsType = {
    dialog: any
}

const Dialog: FC<PropsType> = ({dialog}) => {
    return (
        <div className={style.item}>
            <NavLink to={'/messages/' + dialog.id} activeClassName={style.active}>
                <div className={style.dialog}>
                    <div>
                        <img src={dialog.photos.small || defaultAvatar} alt="avatar"/>
                    </div>
                    <div className={style.content}>
                        <span className={style.name}>{dialog.userName}</span>
                        <span>{dateFormatter(dialog.lastDialogActivityDate)}</span>
                        <p>Online {dateFormatter(dialog.lastUserActivityDate)}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};
export default Dialog;