import React, {FC, useRef, useState} from 'react';
import style from './PostForm.module.css';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetObjectsKeys, Textarea} from "../../../common/forms-controls/FormsControls";
import {Button} from "antd";
import s from "../Posts.module.css";
import defaultAvatar from "../../../../assets/images/user.png";
import UploadInput, {UploadInputPropsType} from "../../../common/forms-controls/UploadInput/UploadInput";
import {TPostContent, TUploadedFile} from "../../../../types/types";
import {useClearFormAfterSubmit} from "../../../../hook/useClearFormeAfterSubmit";
import {useScrollToRef} from "../../../../hook/useScrollToRef";
import EditingInfo from "../../../common/forms-controls/EditingInfo/EditingInfo";

export type PostsFormPropsType = {
    firstName: string | null
    avatar: string | null
    isInputFocus: boolean
    editMode: boolean
    uploadFile: (file: File) => void
    uploadedFiles: Array<TUploadedFile>
    removeUploadedFile: (fileName: string) => void
    cancelUploading: (formName: string, fieldName: string, urlFile?: string) => void
    deleteFile: (fileUrl: string) => void
    disableInputFocus: () => void
    cancelEditing: () => void
    removeEditingPostVideoLink: () => void
}

type PostFormDataKeysType = GetObjectsKeys<TPostContent>;

const PostsForm: FC<PostsFormPropsType & InjectedFormProps<TPostContent, PostsFormPropsType>> = (props) => {
    const {
        handleSubmit,
        firstName,
        avatar,
        uploadFile,
        uploadedFiles,
        removeUploadedFile,
        submitSucceeded,
        cancelUploading,
        deleteFile,
        initialValues,
        editMode,
        cancelEditing,
        removeEditingPostVideoLink
    } = props;

    const formElement = useRef<HTMLFormElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    useClearFormAfterSubmit(submitSucceeded, props.reset);
    useScrollToRef(formElement, props.isInputFocus);

    const toggleIsUploading = (isUploading: boolean) => {
        setIsUploading(isUploading)
    };

    return (
        <form ref={formElement} onSubmit={handleSubmit} className={style.post__form}>
            {editMode && initialValues.text && (
                <EditingInfo
                    handleCancelEditing={cancelEditing}
                    textContent={initialValues.text}
                    filesCount={initialValues.photos?.length}
                    videoLink={initialValues.video}
                    className={style.editingInfo}
                    removeVideoLink={removeEditingPostVideoLink}
                />
            )}
            <div className={style.field}>
                <img className={s.avatar} src={avatar || defaultAvatar} alt="avatar"/>
                {createField<PostFormDataKeysType>({
                    component: Textarea,
                    customClassName: 'top',
                    name: 'text',
                    placeholder: `What's your mind? ${firstName}!`,
                    props: {
                        isFocus: props.isInputFocus,
                        toggleIsFocus: props.disableInputFocus
                    }
                })}
            </div>
            <div className={style.buttons}>
                {createField<PostFormDataKeysType, UploadInputPropsType>({
                    component: UploadInput,
                    name: 'photos',
                    props: {
                        uploadFile,
                        uploadedFiles,
                        removeUploadedFile,
                        submitSucceeded,
                        cancelUploading,
                        toggleIsUploading,
                        isUploading,
                        deleteFile,
                        initialValue: initialValues.photos
                    }
                })}
                <Button
                    type='primary'
                    className={style.shareBtn}
                    htmlType='submit'
                    disabled={isUploading}
                >
                    Share
                </Button>
            </div>
        </form>
    );
};

export default reduxForm<TPostContent, PostsFormPropsType>({
    form: 'myPost',
    initialValues: {
        text: '',
        photos: []
    },
    destroyOnUnmount: false,
    enableReinitialize: true
})(PostsForm);
