import React from 'react';
import {addPost, deletePost, getPosts, changePostLike, uploadFile} from "../../../redux/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getFirstName} from "../../../redux/profile-selector";
import {PostType, TPostFormData} from "../../../types/types";
import {AppStateType} from "../../../redux/store";

type MapStatePropsType = {
    postData: Array<PostType>
    avatar: string | null
    firstName: string | null
    userId: number | null
}

type MapDispatchPropsType = {
    addPost: (post: TPostFormData) => void
    deletePost: (postId: string) => void
    changePostLike: (postId: string) => void
    getPosts: () => void
    uploadFile: (file: File) => void
}

type OwnPropsType = {
    isMyProfile: boolean
}

class PostsContainer extends React.Component<MapStatePropsType & MapDispatchPropsType & OwnPropsType> {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return <Posts {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    postData: state.profile.postData,
    avatar: state.profile.profile && state.profile.profile.photos.small,
    firstName: getFirstName(state),
    userId: state.auth.userId
});

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {addPost, deletePost, changePostLike, uploadFile, getPosts})(PostsContainer);
