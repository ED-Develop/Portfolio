import React from 'react';
import style from './ComingSoon.module.scss';
import {Result} from 'antd';
import {MainLayout} from '../main/MainLayout';

type PropsType = {
    isFullScreen?: boolean
}

export const ComingSoon: React.FC<PropsType> = ({isFullScreen}) => {
    const result = <Result title='Coming Soon!'/>;

    if (isFullScreen) {
        return (
            <MainLayout
                contentClassName={style.soon}
            >
                {result}
            </MainLayout>
        )
    }

    return (
        <div className={style.soon}>
            {result}
        </div>
    )
};