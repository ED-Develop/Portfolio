import React from 'react';
import {profileActions} from "../../../redux/profile-reducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";
import {getPosts} from "../../../redux/profile-selector";
import {PostType} from "../../../types/types";
import {AppStateType} from "../../../redux/store";

const {addPost, deletePost, incrementedLike} = profileActions;

type MapStatePropsType = {
    postData: Array<PostType>
    avatar?: string | null
    login: string | null
}

type MapDispatchPropsType = {
    addPost: (post: string) => void
    deletePost: (postId: number) => void
    incrementedLike: (postId: number) => void
}

type OwnPropsType = {
    isMyProfile: boolean
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        postData: getPosts(state),
        avatar: state.profile.profile ? state.profile.profile.photos.small : null,
        login: state.profile.profile ? state.profile.profile.fullName : null,

    };
};

const MyPostContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {addPost, deletePost, incrementedLike})(MyPost);

export default MyPostContainer;
