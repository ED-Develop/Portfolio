import React from 'react';
import style from './About.module.css';
import {TAboutProfile} from '../../../../redux/timeline/timeline-selector';
import {TContacts} from '../../../../types/types';
import {NavLink} from 'react-router-dom';
import {Button} from 'antd';
import {url} from '../../../../utils/routeManager';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF, faGithub, faInstagram, faTwitter, faVk, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {faCheck, faFileAlt, faGlobe, faLink, faTimes, faUser} from '@fortawesome/free-solid-svg-icons';

type PropsType = {
    aboutProfile: TAboutProfile,
    isMyProfile: boolean
}

type TAboutIcon = { [key in keyof Omit<TAboutProfile, 'contacts'>]: any };
type TContactsIcon = { [key in keyof TContacts]: TContactIcon };

type TContactIcon = {
    icon: IconDefinition,
    color: string
}

const About: React.FC<PropsType> = ({aboutProfile: {contacts, ...restAboutInfo}, isMyProfile}) => {
    const aboutIcons: TAboutIcon = {
        aboutMe: faUser,
        lookingForAJob: restAboutInfo.lookingForAJob ? faCheck : faTimes,
        lookingForAJobDescription: faFileAlt
    };

    const profileInfo = {
        ...restAboutInfo,
        lookingForAJob: restAboutInfo.lookingForAJob ? 'Looking for a job' : 'Not looking for a job'
    };

    const contactsIcons: TContactsIcon = {
        facebook: {icon: faFacebookF, color: '#3b5998'},
        github: {icon: faGithub, color: '#24292e'},
        instagram: {icon: faInstagram, color: '#E1306C'},
        mainLink: {icon: faLink, color: '#FD1D1D'},
        twitter: {icon: faTwitter, color: '#1DA1F2'},
        vk: {icon: faVk, color: '#1A4B78'},
        website: {icon: faGlobe, color: '#1EBBEE'},
        youtube: {icon: faYoutube, color: '#FF0000'}
    };

    const isLookingForAJobDescription = (key: string) => {
        return key === 'lookingForAJobDescription' ? restAboutInfo.lookingForAJob : true;
    }

    return (
        <div className={style.profile__about}>
            <h3>About</h3>
            <div className={style.about}>
                {
                    Object.keys(profileInfo).map(key => {
                        const value = profileInfo[key as keyof typeof profileInfo];

                        if (!value || !isLookingForAJobDescription(key)) return null;

                        return (
                            <div className={style.about__item} key={key}>
                                    <span className={style.icon}>
                                        <FontAwesomeIcon icon={aboutIcons[key as keyof TAboutIcon]}/>
                                    </span>
                                <span>{value}</span>
                            </div>
                        )
                    })
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
                                    <FontAwesomeIcon icon={iconObj.icon}/>
                                </a>
                            )
                        }

                        return null;
                    })
                }
            </div>
            {isMyProfile && (
                <NavLink to={url('settings')}>
                    <Button className='btn btn-light-primary'>Edit</Button>
                </NavLink>
            )}
        </div>
    )
};

export default About;
