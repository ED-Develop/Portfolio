import React from 'react';
import style from './Messages.module.scss';
import {TMessageModel} from '../../../types/types';

import {Message} from './Message';

const messages: Array<TMessageModel> = [
    {
        message: 'Hello',
        photo: null,
        userId: 1,
        userName: 'Dimich'
    },
    {
        message: 'Hi',
        photo: null,
        userId: 2,
        userName: 'Edward'
    }
];

export const Messages = () => {
    return (
        <div className={style.messages}>
            {
                messages.map(message => <Message {...message}/>)
            }
        </div>
    );
};
