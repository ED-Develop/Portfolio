import React from 'react';
import MyMessages from "./MyMessages/MyMessages";
import s from './Messages.module.css'
import YourMessages from "./YourMessages/YourMessages";
import Input from "./Input/Input";

const Messages = ({messages,avatar, addMessage, userId, login}) => {


let messageElements = messages
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
                {messages.length ? messageElements : <h1>Send first message</h1>}
            </div>
            <Input login={login} avatar={avatar} userId={userId} addMessage={addMessage}/>
        </div>
    );
}
    ;
    export default Messages;