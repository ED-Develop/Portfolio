import React from 'react';
import Dialog from "./Dialog/Dialog";
import style from './DialogsItems.module.css'

const DialogsItems = (props) => {


    let dialogElemnts = props.dialogsData
        .map(dialog => <Dialog id={dialog.id} name={dialog.name} date={dialog.date} message={dialog.lastMessage}
                               avatar={dialog.avatar}/>);

    return (
        <div className={style.items}>
            {dialogElemnts}
        </div>
    );
};
export default DialogsItems;