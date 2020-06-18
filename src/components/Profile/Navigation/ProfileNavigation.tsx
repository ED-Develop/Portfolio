import React from "react";
import style from './ProfileNavigation.module.css';
import {Button, Col, Row} from "antd";
import {CloseOutlined, MessageOutlined, PlusOutlined} from "@ant-design/icons/lib";
import TabsNavigation from "../../common/TabsNavigation/TabsNavigation";

type PropsType = {
    isMyProfile: boolean
    followed: boolean
}

const ProfileNavigation: React.FC<PropsType> = ({isMyProfile, followed}) => {
    const navItems = [
        {title: 'Timeline', href: '/profile/timeline'},
        {title: 'About', href: '/profile/about'},
        {title: 'Friends', href: '/profile/friends'},
        {title: 'Photos', href: '/profile/photos'},
    ];

    return (
        <Row className={style.profile__navigation}>
            <Col span={15} className={style.nav}>
                <TabsNavigation navItems={navItems}/>
            </Col>
            <Col span={9} className={style.navBtns}>
                {!isMyProfile && (
                    <>
                        <Button type='primary'><MessageOutlined/>Send message</Button>
                        {
                            followed
                                ? <Button type='primary' danger><CloseOutlined/>Remove friend</Button>
                                : <Button type='primary'><PlusOutlined/>Add to friend</Button>
                        }
                    </>
                )}
            </Col>
        </Row>
    )
};

export default ProfileNavigation;
