import React, {FC} from 'react';
import Dialog from "./Dialog/Dialog";
import style from './DialogsItems.module.css'

type PropsType = {
    dialogs: Array<any>
}

const DialogsItems: FC<PropsType> = (props) => {
    let dialogElemnts = props.dialogs
        .map(dialog => {
            console.log(dialog);
            return <Dialog key={dialog.id} dialog={dialog}/>
        });

    return (
        <div className={style.items}>
            {dialogElemnts}
        </div>
    );
};
export default DialogsItems;