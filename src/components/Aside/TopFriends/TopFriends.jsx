import React from 'react';
import style from './TopFriends.module.css';
import FriendItem from "./FriendItem/FriendItem";

const TopFriends = ({friendsData}) => {
    let friendsItemElements = friendsData
        .map( friend => <FriendItem avatar={friend.avatar}/>);

    return (
        <div className={style.container}>
            <div className={style.btn}>
                <a href="#">My friends</a>
            </div>
            <div className={style.items}>
                {friendsItemElements}
            </div>
        </div>
    );
};

export default TopFriends;