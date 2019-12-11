import React from 'react';
import style from './Aside.module.css';
import Nav from "./Nav/Nav";
import ProfileCard from "./ProfileCard/ProfileCard";
import TopFriends from "./TopFriends/TopFriends";

const Aside = ({avatar, login, myId, isAuth, friends, getFriends}) => {
        return (
            <aside className={style.aside}>
                {isAuth && <ProfileCard avatar={avatar} login={login}/>}
                <Nav myId={myId}/>
                {isAuth && <TopFriends getFriends={getFriends} friends={friends}/>}
            </aside>
        )
};

export default Aside;