import React from 'react';
import style from '../Auth.module.scss';
import {Layout} from 'antd';

const {Sider} = Layout;

export const LoginAside: React.FC = ({children}) => {
    return (
        <Sider width='33%' className={style.sider}>
            <div className={style.landing__sider}>
                {children}
            </div>
        </Sider>
    )
};