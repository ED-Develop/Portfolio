import React, {FC} from 'react';
import MyMessages from "./MyMessages/MyMessages";
import style from './Messages.module.css'
import YourMessages from "./YourMessages/YourMessages";
import Input from "./Input/Input";

type PropsType = {
    messages: Array<any>
    avatar: string | null
    userId: number | null
    login: string | null
    addMessage: (messageText: string, userId: number, login: string) => void
}

const Messages: FC<PropsType> = ({messages,avatar, addMessage, userId, login}) => {


let messageElements = messages
    .map(message => {
        if (message.userId == userId) {
            return <MyMessages key={message.id} message={message}
                               avatar={avatar} login={login}/>
        } else {
            return <YourMessages key={message.id} message={message} />
        }
    });


    return (
        <div>
            <div className={style.messages}>
                {messages.length ? messageElements : <h1>Send first message</h1>}
            </div>
            <Input login={login} avatar={avatar} userId={userId} addMessage={addMessage}/>
        </div>
    );
}
    ;
    export default Messages;