import React from 'react';
import MyMessages from "./MyMessages/MyMessages";
import s from './Messages.module.css'
import YourMessages from "./YourMessages/YourMessages";
import Input from "./Input/Input";

const Messages = ({messagesData,avatar, addMessage, userId, login}) => {


let messageElements = messagesData
    .map(message => {
        if (message.userId == userId) {
            return <MyMessages key={message.id} date={message.date} message={message.message}
                               avatar={avatar} login={login}/>
        } else {
            return <YourMessages key={message.id} date={message.date} message={message.message} name={message.user}
                                 avatar={message.avatar}/>
        }
    });


    return (
        <div>
            <div className={s.messages}>
                {messageElements}
            </div>
            <Input login={login} avatar={avatar} userId={userId} addMessage={addMessage}/>
        </div>
    );
}
    ;
    export default Messages;