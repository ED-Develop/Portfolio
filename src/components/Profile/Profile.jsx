import React, {useState} from 'react';
import style from "./Profile.module.css";
import {NavLink} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import userAvatar from "../../assets/images/user.png";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import information from "../../assets/images/Information.png";
import edit from "../../assets/images/edit.png";
import work from "../../assets/images/work.png";
import ok from "../../assets/images/OK.png";
import noo from "../../assets/images/noo.png";
import Contacts from "./Contacts/Contacts";
import MyPostContainer from "./MyPost/MyPostContainer";
import ModalWindow from "../common/ModalWindow/ModalWindow";

const Profile = ({profile, uploadProfilePhoto, isUpload, startDialogs, ...props}) => {
    let [isModal, setIsModal] = useState(false);

    const showModalWindow = () => {
        setIsModal(true);
    };
    const hideModalWindow = () => {
        setIsModal(false);
    };
    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            uploadProfilePhoto(e.target.files[0]);
            setIsModal(false);
        }
    };

    const onWriteMessage = () => {
        startDialogs(props.userId);
    };

    let modalWindow = (<ModalWindow hideModalWindow={hideModalWindow}
                                    footerDescription={'If you are having trouble downloading, try choosing a smaller photo.'}
                                    modalTitle={'Upload new photo'}>
        <div className={style.modalDescription}>
            <div>It will be easier for friends to recognize you if you upload your real photo.</div>
            <div>You can upload a JPG, GIF or PNG image.</div>
        </div>
        <div className={style.inputFile}>
            <input onChange={onPhotoSelected} type='file'/>
        </div>
    </ModalWindow>);


    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            {isUpload && <Preloader/>}
            {isModal && modalWindow}
            <div className={style.wrapper}>
                <div className={style.avatar}>
                    <div className={style.avatarContainer}>
                        <img src={profile.photos.large ? profile.photos.large : userAvatar} alt="Avatar"/>
                        {props.isMyProfile && <div className={style.avatarMenu}>
                            <p onClick={showModalWindow}>&#9650; <span>Load avatar</span></p>
                        </div>}
                    </div>
                    <h2>{profile.fullName}</h2>
                    <ProfileStatus isMyProfile={props.isMyProfile}
                                   updateProfileStatus={props.updateProfileStatus} status={props.status}/>
                    {!props.isMyProfile && <div className={style.btn}>
                        <button  onClick={onWriteMessage}>Write message</button>
                    </div>}
                </div>
                <div className={style.info}>
                    <div className={style.personal_information}>
                        <h3><img src={information} alt="i"/>Personal Information</h3>
                        {props.isMyProfile && <div className={style.edit}>
                            <NavLink to='/edit'><img src={edit} alt="edit"/></NavLink>
                        </div>}
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
            <MyPostContainer isMyProfile={props.isMyProfile}/>
        </div>
    )
};

export default Profile;