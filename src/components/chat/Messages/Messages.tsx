import React, {useEffect, useRef} from 'react';
import style from './Messages.module.scss';
import {TMessageModel} from '../../../types/types';

import {Message} from './Message';

type PropsType = {
    messages: Array<TMessageModel>
}

export const Messages: React.FC<PropsType> = ({messages}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollHeight = ref.current?.scrollHeight || 0;
        const scrollTop = ref.current?.scrollTop || 0;
        console.log('scrollHeight', scrollHeight);
        console.log('scrollTop', scrollTop);
        console.log({...ref.current});
        if (ref.current && (scrollTop === 0 || scrollHeight - scrollTop < 100)) {
            ref.current.scrollTop = scrollHeight;
        }
    }, [messages]);

    return (
        <div className={style.messages} ref={ref}>
            {
                messages.map((message, index) => <Message {...message} key={index}/>)
            }
        </div>
    );
};
