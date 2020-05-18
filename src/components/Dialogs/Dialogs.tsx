import React, {FC} from 'react';
import style from './Dialogs.module.css';
import DialogsItems from "./DialogsItems/DialogsItems";
import Messages from "./Messages/Messages";
import Search from "../common/Search/Search";

type PropsType = {
    messages: Array<any>
    dialogs: Array<any>
    avatar: string | null
    login: string | null
    userId: number | null
    addMessage: (messageText: string, userId: number, login: string) => void
}

const Dialogs: FC<PropsType> = ({dialogs, ...props}) => {
    return (
        <div className={style.dialogs}>
            <Search placeholder='Search dialog'/>
            <div className={style.container}>
                <DialogsItems dialogs={dialogs}/>
                <Messages
                    messages={props.messages}
                    addMessage={props.addMessage}
                    avatar={props.avatar}
                    login={props.login}
                    userId={props.userId}
                />
            </div>
        </div>
    );
};

export default Dialogs;
