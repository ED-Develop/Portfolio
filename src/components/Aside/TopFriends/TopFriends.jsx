import React, {Component} from 'react';
import style from './TopFriends.module.css';
import FriendItem from "./FriendItem/FriendItem";

class TopFriends extends Component {
    componentDidMount() {
        this.props.getFriends();
    }

    render() {
        let {friends} = this.props;

        return (
            <div className={style.container}>
                <div className={style.btn}>
                    <a href="#">My friends</a>
                </div>
                <div className={style.items}>
                    {friends.map(friend => <FriendItem key={friend.id} avatar={friend.photos.small}
                                                       name={friend.name} id={friend.id}/>)}
                </div>
            </div>
        );
    }
}

export default TopFriends;