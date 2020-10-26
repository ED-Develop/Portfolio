import React, {FC} from 'react';
import Dialog from "./Dialog/Dialog";
import style from './DialogsItems.module.css'

type PropsType = {
    dialogs: Array<any>
}

const DialogsItems: FC<PropsType> = ({dialogs}) => {
    return (
        <div className={style.items}>
            {dialogs.map(dialog => <Dialog key={dialog.id} dialog={dialog}/>)}
        </div>
    );
};

export default DialogsItems;
