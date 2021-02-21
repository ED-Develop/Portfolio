import React, {UIEvent, useEffect, useRef, useState} from 'react';
import style from './Messages.module.scss';
import {TMessageModel} from '../../../types/types';

import {Message} from './Message';

type PropsType = {
    messages: Array<TMessageModel>
}

export const Messages: React.FC<PropsType> = ({messages}) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    useEffect(() => {
        if (isAutoScroll) anchorRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const $el = e.currentTarget;
        const isScrollInBottom = $el.scrollHeight - $el.scrollTop - 300 < $el.clientHeight;

        if (isAutoScroll !== isScrollInBottom) {
            setIsAutoScroll(isScrollInBottom);
        }
    };

    return (
        <div className={style.messages} onScroll={handleScroll}>
            {
                messages.map((message, index) => <Message {...message} key={index}/>)
            }
            <div ref={anchorRef}/>
        </div>
    );
};
