import React, {useEffect} from 'react';
import style from './Chat.module.scss';

import {Messages} from './Messages/Messages';
import {ChatForm, TChatFormData} from './Form/ChatForm';
import {useSelector} from '../../hook/useSelector';
import {selectMessages} from '../../redux/chat/chat-selectors';
import {useDispatch} from 'react-redux';
import {sendMessage, startChatListening, stopChatListening} from '../../redux/chat/chat-reducer';

export const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages);

    useEffect(() => {
        dispatch(startChatListening());

        return () => {
            dispatch(stopChatListening);
        };
    }, []);

    const handleSendMessage = ({message}: TChatFormData) => {
        dispatch(sendMessage(message));
    };

    return (
        <div className={style.chat}>
            <Messages messages={messages}/>
            <ChatForm
                onSubmit={handleSendMessage}
            />
        </div>
    );
};
