import React from 'react';
import style from './InitLoader.module.scss';
import {Spin} from 'antd';
import {MainLayout} from '../layout/main/MainLayout';

export const InitLoader = () => {
    return (
        <MainLayout contentClassName={style.loader__container}>
            <Spin size="large"/>
        </MainLayout>
    )
}