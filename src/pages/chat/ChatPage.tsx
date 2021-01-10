import React from 'react';
import style from './ChatPage.module.scss';
import {MainLayout} from '../../components/common/layout/main/MainLayout';
import {Chat} from '../../components/chat/Chat';

const ChatPage = () => {
    return (
        <MainLayout
            title='Common Chat'
            contentClassName={style.chatPage}
        >
            <Chat/>
        </MainLayout>
    );
};

export default ChatPage;
