import React from 'react';
import {Col, Layout, Row} from 'antd';

const {Content} = Layout;

export const ContentWrapper: React.FC = ({children}) => {
    return (
        <Content className='app-content'>
            <Row>
                <Col
                    xxl={20}
                    xl={22}
                    lg={23}
                >{children}</Col>
            </Row>
        </Content>
    )
};