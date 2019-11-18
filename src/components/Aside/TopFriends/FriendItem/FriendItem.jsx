import React from 'react';
import style from './FriendItem.module.css';

const FriendItem = (props) => {
    return (
        <div className={`${style.item} ${style.online}`}>
            <a href="#">
                <img src={props.avatar} alt="avatar"/>
            </a>
        </div>
    );
};

export default FriendItem;