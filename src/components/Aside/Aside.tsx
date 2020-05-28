import React, {FC} from 'react';
import style from './Aside.module.css';
import Nav from "./Nav/Nav";
import {Affix, Layout} from "antd";

const {Sider} = Layout;

type PropsType = {
    isAuth: boolean,
    collapsed: boolean
}

const Aside: FC<PropsType> = ({isAuth, collapsed}) => {
        return (
            <Sider theme='light' width='20.8%' className={style.aside} collapsed={collapsed} collapsedWidth={'16.6%'}>
                <Affix offsetTop={65}>
                    <Nav collapsed={collapsed}/>
                </Affix>
            </Sider>
        )
};

export default Aside;
