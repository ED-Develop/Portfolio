import React from 'react';
import {addPost, deletePost, incrementedLike} from "../../../Redux/profileReducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";
import {getPosts} from "../../../Redux/profileSelector";

let mapStateToProps = (state) => {
    return {
        postData: getPosts(state),
        avatar: state.profilePage.profile.photos.small,
        login: state.profilePage.profile.fullName
    };
};

const MyPostContainer = connect(mapStateToProps, {addPost, deletePost, incrementedLike})(MyPost);

export default MyPostContainer;