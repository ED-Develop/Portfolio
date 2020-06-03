import React from 'react';
import Posts from "./Posts";
import {connect} from "react-redux";
import {getFirstName} from "../../../redux/profile-selector";
import {TPostModel, TPostFormData, TUploadedFile} from "../../../types/types";
import {AppStateType} from "../../../redux/store";
import {
    addComment,
    addPost,
    cancelUploading,
    changePostLike, deleteComment,
    deleteFile,
    deletePost, editComment,
    getPosts,
    timelineActions, toggleDisabledComments,
    uploadFile
} from "../../../redux/timeline/timeline-reducer";
import {destroy} from "redux-form";

const {removeUploadedFile} = timelineActions;

type MapStatePropsType = {
    postData: Array<TPostModel>
    avatar: string | null
    firstName: string | null
    userId: number | null
    uploadedFiles: Array<TUploadedFile>
}

type MapDispatchPropsType = {
    addPost: (post: TPostFormData, formName: string) => void
    deletePost: (postId: string) => void
    changePostLike: (postId: string) => void
    getPosts: () => void
    uploadFile: (file: File) => void
    removeUploadedFile: (fileName: string) => void
    cancelUploading: (formName: string, fieldName: string, urlFile?: string) => void
    deleteFile: (fileUrl: string) => void
    addComment: (postId: string, content: string, formName: string) => void
    editComment: (postId: string, content: string, formName: string, commentId: string) => void
    deleteComment: (postId: string, commentId: string) => void
    destroy: (formName: string) => void
    toggleDisabledComments: (postId: string, isDisabled: boolean) => void
}

type OwnPropsType = {
    isMyProfile: boolean
}

export type PostsPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class PostsContainer extends React.Component<PostsPropsType> {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return <Posts {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    postData: state.timeline.postData,
    avatar: state.profile.profile && state.profile.profile.photos.small,
    firstName: getFirstName(state),
    userId: state.auth.userId,
    uploadedFiles: state.timeline.uploadedFiles,
});

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
        addPost,
        deletePost,
        changePostLike,
        uploadFile,
        getPosts,
        removeUploadedFile,
        cancelUploading,
        deleteFile,
        addComment,
        deleteComment,
        destroy,
        editComment,
        toggleDisabledComments
    })(PostsContainer);
