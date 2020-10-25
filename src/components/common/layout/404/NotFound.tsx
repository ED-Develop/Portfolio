import React from 'react';
import style from './NotFound.module.scss';
import {MainLayout} from '../main/MainLayout';
import {Button, Result} from 'antd';
import {NavLink} from 'react-router-dom';
import {url} from '../../../../utils/routeManager';

export const NotFound = () => {
    return (
        <MainLayout contentClassName={style.notFound}>
            <Result
                status='404'
                title='404'
                subTitle='Sorry, the page you visited does not exist.'
                extra={
                    <NavLink to={url('base')}>
                        <Button type="primary">Back Home</Button>
                    </NavLink>
                }
            />
        </MainLayout>
    )
};