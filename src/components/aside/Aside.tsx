import React, {FC} from 'react';
import style from './Aside.module.css';
import Nav from './nav/Nav';
import {Affix, Layout} from 'antd';
import {TAside} from '../../App';

const {Sider} = Layout;

type PropsType = {
    aside: TAside
}

const Aside: FC<PropsType> = ({aside}) => {
    return (
        <Sider
            theme='light'
            width={aside.width}
            className={style.aside}
            collapsed={aside.isCollapsed}
            collapsedWidth={aside.collapsedWidth}
        >
            <Affix offsetTop={80}>
                <Nav collapsed={aside.isCollapsed}/>
            </Affix>
        </Sider>
    )
};

export default Aside;
