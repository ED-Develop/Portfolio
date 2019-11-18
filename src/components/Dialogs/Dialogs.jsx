import React from 'react';
import style from './Dialogs.module.css';
import DialogsItems from "./DialogsItems/DialogsItems";
import Messages from "./Messages/Messages";
import Search from "../common/Search/Search";

const Dialogs = ({dialogsData, ...props}) => {
    return (
        <div className={style.dialogs}>
            <Search placeholder='Search dialog'/>
            <div className={style.container}>
                <DialogsItems dialogsData={dialogsData}/>
                <Messages {...props}/>
            </div>
        </div>
    );
};
export default Dialogs;