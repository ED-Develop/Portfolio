import React from 'react';
import Aside from "./Aside";
import {connect} from "react-redux";

let mapStateToProps=(state) => {
    return {
        friendsData: state.asidePage.friendsData,
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        myId: state.auth.userId,
        avatar: state.auth.photos.small
    };
};

const AsideContainer = connect(mapStateToProps)(Aside);

export default AsideContainer;