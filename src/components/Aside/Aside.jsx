import React from 'react';
import style from './Aside.module.css';
import Nav from "./Nav/Nav";
import ProfileCard from "./ProfileCard/ProfileCard";
import TopFriends from "./TopFriends/TopFriends";

const Aside = ({avatar, login, myId, isAuth, friendsData}) => {
        return (
            <aside className={style.aside}>
                {isAuth && <ProfileCard avatar={avatar} login={login}/>}
                <Nav myId={myId}/>
                {isAuth && <TopFriends friendsData={friendsData}/>}
            </aside>
        )
};

export default Aside;