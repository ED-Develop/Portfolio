import React from 'react';
import Aside from "./Aside";
import {connect} from "react-redux";
import {getFriends} from "../../Redux/asideReducer";

let mapStateToProps=(state) => {
    return {
        friends: state.aside.friends,
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        myId: state.auth.userId,
        avatar: state.auth.photos.small
    };
};

const AsideContainer = connect(mapStateToProps, {getFriends})(Aside);

export default AsideContainer;