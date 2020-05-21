import React, {FC} from 'react';
import style from './Header.module.css'
import Logo from "./Logo/Logo";
import Search from '../common/Search/Search'
import UserInfo from "./UserInfo/UserInfo";
import {Col, Row} from "antd";
import {Layout} from "antd";

const {Content, Sider} = Layout;

type PropsType = {
    logout: () => void
    isAuth: boolean
    avatar: string | null
    toggleIsAsideCollapsed: () => void
    isAsideCollapsed: boolean
}

const onSearch = () => {};

const Header: FC<PropsType> = ({logout, isAuth, avatar, toggleIsAsideCollapsed, isAsideCollapsed}) => {
    const onLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
    };

    return (
        <header className={style.header}>
            <Layout>
                <Sider theme='light' width='20.8%'  collapsed={isAsideCollapsed} collapsedWidth={'16.6%'}>
                    <Logo toggleIsAsideCollapsed={toggleIsAsideCollapsed} isAsideCollapsed={isAsideCollapsed}/>
                </Sider>
                <Content className={style.headerContainer}>
                    <Row>
                        <Col span={14}>
                            <Search onSubmit={onSearch} placeholder='Search for Friends, Videos and more'/>
                        </Col>
                        <Col span={6} offset={4}>
                            <UserInfo avatar={avatar}/>
                        </Col>
                    </Row>
                </Content>
            </Layout>

            {/*<div className={style.headerContainer}>

                <div className={style.auth}>
                    {isAuth
                        ? <a href='#' onClick={onLogout} className={style.login}>Logout</a>
                        : <NavLink className={style.login} to='/login'>Login</NavLink>}
                </div>
            </div>*/}
        </header>
    )
};

export default Header;
