import React from 'react';
import Dialog from "./Dialog/Dialog";
import style from './DialogsItems.module.css'
import {dateFormatter} from "../../../utils/dateFormatter";

const DialogsItems = (props) => {


    let dialogElemnts = props.dialogs
        .map(dialog => {
            let dialogsActivityDate = dateFormatter(dialog.lastDialogActivityDate);
            let userActivityDate = dateFormatter(dialog.lastUserActivityDate);

            return <Dialog key={dialog.id} id={dialog.id} name={dialog.userName} date={dialogsActivityDate}
                           userActivityDate={userActivityDate} avatar={dialog.photos.small}/>
        });

    return (
        <div className={style.items}>
            {dialogElemnts}
        </div>
    );
};
export default DialogsItems;