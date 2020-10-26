import React from 'react';
import style from './Settings.module.scss';
import {SettingsNav} from './nav/SettingsNav';
import {SettingsRoutes} from './routes/SettingsRoutes';
import {Col, Row} from 'antd';

export const Settings = () => {
    return (
        <div className={style.settings}>
            <h1 className={style.settings__title}>Settings</h1>
            <Row gutter={30}>
                <Col span={16}>
                    <SettingsRoutes/>
                </Col>
                <Col span={8}>
                    <SettingsNav/>
                </Col>
            </Row>
        </div>
    )
}