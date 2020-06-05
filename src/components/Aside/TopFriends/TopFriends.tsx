import React, {Component} from 'react';
import style from './TopFriends.module.css';
import FriendItem from "./FriendItem/FriendItem";
import {TUserModel} from "../../../types/types";

type PropsType = {
    friends: Array<TUserModel>,
    getFriends: () => void
}

class TopFriends extends Component<PropsType> {
    componentDidMount() {
        this.props.getFriends();
    }

    render() {
        const {friends} = this.props;

        return (
            <div className={style.container}>
                <div className={style.btn}>
                    <a href="#">My friends</a>
                </div>
                <div className={style.items}>
                    {
                        friends.map(friend => <FriendItem
                            key={friend.id}
                            avatar={friend.photos.small}
                            name={friend.name} id={friend.id}
                        />)
                    }
                </div>
            </div>
        );
    }
}

export default TopFriends;
