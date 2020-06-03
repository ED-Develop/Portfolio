import React, {FC, useRef, useState} from 'react';
import style from './PostForm.module.css';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetObjectsKeys, Textarea} from "../../../common/FormsControls/FormsControls";
import {Button} from "antd";
import s from "../Posts.module.css";
import defaultAvatar from "../../../../assets/images/user.png";
import UploadInput, {UploadInputPropsType} from "./UploadInput";
import {TPostFormData, TUploadedFile} from "../../../../types/types";
import {useClearFormAfterSubmit} from "../../../../hook/useClearFormeAfterSubmit";
import {useScrollToRef} from "../../../../hook/useScrollToRef";

export type PostsFormPropsType = {
    firstName: string | null
    avatar: string | null
    isInputFocus: boolean
    uploadFile: (file: File) => void
    uploadedFiles: Array<TUploadedFile>
    removeUploadedFile: (fileName: string) => void
    cancelUploading: (formName: string, fieldName: string, urlFile?: string) => void
    deleteFile: (fileUrl: string) => void
    disableInputFocus: () => void
}

type PostFormDataKeysType = GetObjectsKeys<TPostFormData>;

const PostsForm: FC<PostsFormPropsType & InjectedFormProps<TPostFormData, PostsFormPropsType>> = (props) => {
    const {
        handleSubmit,
        firstName,
        avatar,
        uploadFile,
        uploadedFiles,
        removeUploadedFile,
        submitSucceeded,
        cancelUploading,
        deleteFile
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
                        deleteFile
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

export default reduxForm<TPostFormData, PostsFormPropsType>({
    form: 'myPost',
    initialValues: {
        text: '',
        photos: []
    },
    destroyOnUnmount: false
})(PostsForm);
