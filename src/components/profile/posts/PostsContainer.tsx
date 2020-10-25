import React, {useEffect, useState} from 'react';
import Posts from './Posts';
import {connect} from 'react-redux';
import {selectFirstName, selectFriendsTitles} from '../../../redux/profile/profile-selector';
import {TPostContent, TPostFormData, TPostModel, TUploadedFile} from '../../../types/types';
import {AppStateType} from '../../../redux/store';
import {
    addComment,
    addPost,
    cancelUploading,
    changePostLike,
    deleteComment,
    deleteFile,
    deletePost,
    editComment,
    editPost,
    getPosts,
    timelineActions,
    toggleDisabledComments,
    uploadFile
} from '../../../redux/timeline/timeline-reducer';
import {destroy} from 'redux-form';
import {Dispatch} from 'redux';
import {DecoratedFormProps} from 'redux-form/lib/reduxForm';
import {PostsFormPropsType} from './form/PostsForm';
import {slectAboutProfileInfo, TAboutProfile} from '../../../redux/timeline/timeline-selector';
import {TFriendsTitle} from '../../../redux/users/users-selector';
import {getFriends} from '../../../redux/profile/profile-reducer';
import {selectUserAvatar} from '../../../redux/auth/auth-selectors';

const {removeUploadedFile} = timelineActions;

type MapStatePropsType = {
    postData: Array<TPostModel>
    avatar: string
    firstName: string | null
    userId: number | null
    uploadedFiles: Array<TUploadedFile>
    aboutProfile: TAboutProfile | null
    friends: Array<TFriendsTitle>
    friendsCount: number
}

type MapDispatchPropsType = {
    addPost: (post: TPostFormData, formName: string) => void
    editPost: (postData: TPostContent, formName: string, postId: string) => void
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
    getFriends: () => void
}

type OwnPropsType = {
    isMyProfile: boolean
}

export type PostsPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const PostsContainer: React.FC<PostsPropsType> = (props) => {
    const {addPost, getPosts, editPost, getFriends, ...restProps} = props;
    const [editingPost, setEditingPost] = useState<TPostModel | null>(null);
    const [isInputFocus, toggleIsInputFocus] = useState(false);

    useEffect(() => {
        if (!props.postData.length) getPosts();

        if (!props.friends.length) getFriends();
    }, []);

    const startEditing = (post: TPostModel) => {
        if (!editingPost || editingPost.postId !== post.postId) {
            setEditingPost(post);
        }

        toggleIsInputFocus(true);
    };

    const removeEditingPostVideoLink = () => {
        if (editingPost) {
            setEditingPost({...editingPost, content: {...editingPost?.content, video: ''}})
        }
    };

    const disableInputFocus = () => toggleIsInputFocus(false);

    const resetForm = () => {
        disableInputFocus();
        setEditingPost(null);
    };

    const submitForm = (
        formData: TPostFormData,
        dispatch: Dispatch,
        {form}: DecoratedFormProps<TPostFormData, PostsFormPropsType>
    ) => {
        if (editingPost && form) {
            editPost({...formData, video: editingPost.content.video}, form, editingPost.postId);
            resetForm();
        } else if (form) {
            addPost(formData, form);
        }
    };

    return <Posts
        {...restProps}
        isInputFocus={isInputFocus}
        startEditing={startEditing}
        disableInputFocus={disableInputFocus}
        formInitialValue={editingPost?.content}
        submitForm={submitForm}
        editMode={!!editingPost}
        cancelEditing={resetForm}
        removeEditingPostVideoLink={removeEditingPostVideoLink}
    />
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    postData: state.timeline.postData,
    avatar: selectUserAvatar(state),
    firstName: selectFirstName(state),
    userId: state.auth.userId,
    uploadedFiles: state.timeline.uploadedFiles,
    aboutProfile: slectAboutProfileInfo(state),
    friends: selectFriendsTitles(state),
    friendsCount: state.profile.friendsCount
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
        toggleDisabledComments,
        editPost,
        getFriends
    })(PostsContainer);
