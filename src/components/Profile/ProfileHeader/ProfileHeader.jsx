import React from 'react';
import s from './ProfileHeader.module.css'
import {NavLink} from "react-router-dom";

const ProfileHeader = React.memo(({isMyProfile, userId, followed}) => {
    return (
        <div className={s.container}>
                <div className={s.profileNav}>
                    <ul>
                        <li>
                            <NavLink to={`/profile${!isMyProfile ? "/" + userId : ''}/about`}
                                     activeClassName={s.active}>About</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/profile${!isMyProfile ? "/" + userId : ''}/album`}
                                     activeClassName={s.active}>Album</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/profile${!isMyProfile ? "/" + userId : ''}/project`}
                                     activeClassName={s.active}>Project</NavLink>
                        </li>
                    </ul>
                    <div className={s.followers}>
                        <span>1,223 people following her</span>
                        {isMyProfile ? <button className={s.view}>View followers</button>
                        : followed ? <button className={s.view}>Unfollow</button> :  <button className={s.view}>Follow</button>}
                    </div>

                </div>
        </div>
    );
});
export default ProfileHeader;