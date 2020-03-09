import React, {FC} from 'react';
import style from './Aside.module.css';
import Nav from "./Nav/Nav";
import ProfileCard from "./ProfileCard/ProfileCard";
import TopFriends from "./TopFriends/TopFriends";
import {UserType} from "../../types/types";

type PropsType = {
    avatar: string | null
    login: string | null
    isAuth: boolean
    friends: Array<UserType>
    getFriends: () => void
}

const Aside: FC<PropsType> = ({avatar, login,
                                  isAuth, friends, getFriends}) => {
        return (
            <aside className={style.aside}>
                {isAuth && <ProfileCard avatar={avatar} login={login}/>}
                <Nav/>
                {isAuth && <TopFriends getFriends={getFriends} friends={friends}/>}
            </aside>
        )
};

export default Aside;