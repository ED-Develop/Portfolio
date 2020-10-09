import React, {FC} from 'react';
import style from '../Auth.module.scss';
import {Banner} from '../banner/Banner';
import {Layout} from 'antd';
import {LoginAside} from '../asside/Asside';

export const Landing: FC = ({children}) => {
    return (
        <Layout className={style.container}>
            <Banner/>
            <LoginAside>{children}</LoginAside>
        </Layout>
    )
};


