import React from 'react';
import style from './Messages.module.scss';
import {TMessageModel} from '../../../types/types';

import {Message} from './Message';

type PropsType = {
    messages: Array<TMessageModel>
}

export const Messages: React.FC<PropsType> = ({messages}) => {
    return (
        <div className={style.messages}>
            {
                messages.map((message, index) => <Message {...message} key={index}/>)
            }
        </div>
    );
};
