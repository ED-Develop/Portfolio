import React from 'react';
import style from './Chat.module.scss';

import {Messages} from './Messages/Messages';
import {ChatForm} from './Form/ChatForm';

export const Chat = () => {
    return (
        <div className={style.chat}>
            <Messages/>
            <ChatForm/>
        </div>
    );
};
