import React, {useEffect, useState} from 'react';
import style from './Chat.module.scss';

import {Messages} from './Messages/Messages';
import {ChatForm, TChatFormData} from './Form/ChatForm';
import {TMessageModel} from '../../types/types';

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export const Chat = () => {
    const [messages, setMessages] = useState<Array<TMessageModel>>([]);

    const handleReceiveMessage = (e: MessageEvent) => {
        setMessages(prevState => ([...prevState, ...(JSON.parse(e.data) || [])]));
    };

    useEffect(() => {
        wsChannel.addEventListener('message', handleReceiveMessage);

        return () => {
            wsChannel.removeEventListener('message', handleReceiveMessage);
        };
    }, []);

    const handleSendMessage = ({message}: TChatFormData) => {
        wsChannel.send(message);
    };

    return (
        <div className={style.chat}>
            <Messages messages={messages}/>
            <ChatForm onSubmit={handleSendMessage}/>
        </div>
    );
};
