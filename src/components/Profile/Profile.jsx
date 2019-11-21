import React from 'react';
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import About from "./About/About";
import {Route} from "react-router-dom";
import Album from "./Album/Album";
import Projects from "./Projects/Projects";

const Profile = ({status, updateProfileStatus, followed,  profile, isMyProfile, userId, isAuth, uploadProfilePhoto, isUpload}) => {
    return (
        <div>
            <ProfileHeader followed={followed} userId={userId} isMyProfile={isMyProfile}/>
            {isAuth && <Route exact path='/' render={() => <About status={status}
                                                                  updateProfileStatus={updateProfileStatus}
                                                                  uploadProfilePhoto={uploadProfilePhoto}
                                                                  profile={profile}
                                                                  isMyProfile={isMyProfile} isUpload={isUpload}/>}/>}
            <Route path='/profile/:userId?/album' render={() => <Album/>}/>
            <Route path='/profile/:userId?/project' render={() => <Projects/>}/>
            <Route path='/profile/:userId?/about' render={() => <About status={status}
                                                                       updateProfileStatus={updateProfileStatus}
                                                                       uploadProfilePhoto={uploadProfilePhoto}
                                                                       profile={profile}
                                                                       isMyProfile={isMyProfile} isUpload={isUpload}/>}/>


        </div>
    )
};

export default Profile;