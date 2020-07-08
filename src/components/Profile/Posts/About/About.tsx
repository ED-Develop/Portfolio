import React from "react";
import style from './About.module.css';
import {
    AntCloudOutlined,
    AntDesignOutlined,
    CheckOutlined,
    CloseOutlined,
    FacebookOutlined,
    GithubOutlined,
    IeOutlined,
    InstagramOutlined,
    ProfileOutlined,
    TwitterOutlined,
    UserOutlined,
    YoutubeOutlined
} from "@ant-design/icons/lib";
import {TAboutProfile} from "../../../../redux/timeline/timeline-selector";
import {TContacts} from "../../../../types/types";
import {NavLink} from "react-router-dom";
import {Button} from "antd";

type PropsType = {
    aboutProfile: TAboutProfile
}

type TAboutIcon = { [key in keyof Omit<TAboutProfile, 'contacts'>]: any };
type TContactsIcon = { [key in keyof TContacts]: TContactIcon };

type TContactIcon = {
    icon: React.ReactNode,
    color: string
}

const About: React.FC<PropsType> = ({aboutProfile: {contacts, ...restAboutInfo}}) => {
    const aboutIcons: TAboutIcon = {
        aboutMe: <UserOutlined/>,
        lookingForAJob: restAboutInfo.lookingForAJob ? <CheckOutlined/> : <CloseOutlined/>,
        lookingForAJobDescription: <ProfileOutlined/>
    };

    const profileInfo = {
        ...restAboutInfo,
        lookingForAJob: restAboutInfo.lookingForAJob ? 'Looking for a job' : 'Not looking for a job'
    };

    const contactsIcons: TContactsIcon = {
        facebook: {icon: <FacebookOutlined/>, color: '#3b5998'},
        github: {icon: <GithubOutlined/>, color: '#24292e'},
        instagram: {icon: <InstagramOutlined/>, color: '#E1306C'},
        mainLink: {icon: <AntCloudOutlined/>, color: '#FD1D1D'},
        twitter: {icon: <TwitterOutlined/>, color: '#1DA1F2'},
        vk: {icon: <AntDesignOutlined/>, color: '#1A4B78'},
        website: {icon: <IeOutlined/>, color: '#1EBBEE'},
        youtube: {icon: <YoutubeOutlined/>, color: '#FF0000'}
    };

    return (
        <div className={style.profile__about}>
            <h3>About</h3>
            <div className={style.about}>
                {
                    Object.keys(profileInfo).map(key => (
                        <div className={style.about__item} key={key}>
                            <span className={style.icon}>{aboutIcons[key as keyof TAboutIcon]}</span>
                            {profileInfo[key as keyof typeof profileInfo]}
                        </div>
                    ))
                }
            </div>
            <div className={style.contacts}>
                {
                    Object.keys(contacts).map(key => {
                        const contact = contacts[key as keyof TContacts];

                        if (contact) {
                            const iconObj = contactsIcons[key as keyof TContactsIcon];

                            return (
                                <a
                                    href={contact}
                                    className={`${style.icon} ${style.icon_big}`}
                                    style={{color: iconObj.color}}
                                    key={key}
                                >
                                    {iconObj.icon}
                                </a>
                            )
                        }

                        return null;
                    })
                }
            </div>
            <NavLink to='/edit'>
                <Button className='btn btn-light-primary'>Edit</Button>
            </NavLink>
        </div>
    )
};

export default About;
