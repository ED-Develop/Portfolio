import React, {FC} from 'react';
import style from './Header.module.css'
import Logo from "./logo/Logo";
import Search from './search/Search'
import UserInfo from "./user-info/UserInfo";
import {Col, Row} from "antd";
import {Layout} from "antd";
import {TUserModel} from "../../types/types";

const {Content, Sider} = Layout;

type PropsType = {
    logout: () => void
    isAuth: boolean
    searchString: string
    userName: string | null
    userStatus: string | null
    isSearchFetching: boolean
    avatar: string | null
    toggleIsAsideCollapsed: () => void
    isAsideCollapsed: boolean
    searchResults: Array<TUserModel>
    searchItems: (string: string, next?: boolean) => void,
    restoreSearchList: () => void
    cashSelectedItem: (item: TUserModel) => void
    setSearchString: (string: string) => void
    reset: (formName: string) => void
}

const Header: FC<PropsType> = ({logout, avatar, toggleIsAsideCollapsed, isAsideCollapsed, searchItems, searchResults, ...props}) => {
    return (
        <header className={style.header}>
            <Layout>
                <Sider theme='light' width='20.8%' collapsed={isAsideCollapsed} collapsedWidth={'16.6%'}>
                    <Logo toggleIsAsideCollapsed={toggleIsAsideCollapsed} isAsideCollapsed={isAsideCollapsed}/>
                </Sider>
                <Content className={style.headerContainer}>
                    <Row>
                        <Col span={14}>
                            <Search
                                searchItems={searchItems}
                                searchResults={searchResults}
                                searchString={props.searchString}
                                restoreSearchList={props.restoreSearchList}
                                cashSelectedItem={props.cashSelectedItem}
                                isSearchFetching={props.isSearchFetching}
                                setSearchString={props.setSearchString}
                                reset={props.reset}
                            />
                        </Col>
                        <Col span={6} offset={4}>
                            <UserInfo
                                avatar={avatar}
                                userName={props.userName}
                                userStatus={props.userStatus}
                                logout={logout}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </header>
    )
};

export default Header;
