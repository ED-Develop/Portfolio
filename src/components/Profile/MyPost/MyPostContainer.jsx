import React from 'react';
import {addPost, deletePost, incrementedLike} from "../../../Redux/profileReducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";
import {getPosts} from "../../../Redux/profileSelector";

let mapStateToProps = (state) => {
    return {
        postData: getPosts(state),
        avatar: state.profile.profile.photos.small,
        login: state.profile.profile.fullName,

    };
};

const MyPostContainer = connect(mapStateToProps, {addPost, deletePost, incrementedLike})(MyPost);

export default MyPostContainer;