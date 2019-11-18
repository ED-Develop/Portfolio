import React from 'react';
import style from './About.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userAvatar from '../../../assets/images/user.png';
import information from '../../../assets/images/Information.png';
import work from '../../../assets/images/work.png';
import ok from '../../../assets/images/OK.png';
import noo from '../../../assets/images/noo.png';
import MyPostContainer from "../MyPost/MyPostContainer";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import Contacts from "./Contacts/Contacts";

const About = ({profile, ...props}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={style.wrapper}>
                <div className={style.avatar}>
                    <img src={profile.photos.large ? profile.photos.large : userAvatar} alt="Avatar"/>
                    <h2>{profile.fullName}</h2>
                    <ProfileStatus isMyProfile={props.isMyProfile}
                                   updateProfileStatus={props.updateProfileStatus} status={props.status}/>
                </div>
                <div className={style.info}>
                    <div className={style.personal_information}>
                        <h3><img src={information} alt="i"/>Personal Information</h3>
                        <p>{profile.aboutMe}</p>
                    </div>
                    <div className={style.work}>
                        <h3><img src={work} alt="W"/> Work Experiences</h3>
                        {profile.lookingForAJob
                            ? <div><p><img src={ok} alt="ok"/>I am looking for work!</p>
                                <p>{profile.lookingForAJobDescription}</p></div>
                            : <p><img src={noo} alt="ok"/>I am not looking for work!</p>
                        }
                    </div>
                    <Contacts contacts={profile.contacts}/>
                </div>
            </div>
            <MyPostContainer/>
        </div>
    )
};

export default About;