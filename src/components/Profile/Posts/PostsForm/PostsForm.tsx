import React, {FC, useEffect, useState} from 'react';
import style from './PostForm.module.css';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetObjectsKeys, Textarea} from "../../../common/FormsControls/FormsControls";
import {Button} from "antd";
import s from "../Posts.module.css";
import defaultAvatar from "../../../../assets/images/user.png";
import UploadInput, {UploadInputPropsType} from "./UploadInput";
import {TPostFormData, TUploadedFile} from "../../../../types/types";

export type PostsFormPropsType = {
    firstName: string | null
    avatar: string | null
    uploadFile: (file: File) => void
    uploadedFiles: Array<TUploadedFile>
    removeUploadedFile: (fileName: string) => void
    cancelUploading: (formName: string, fieldName: string, urlFile?: string) => void
    deleteFile: (fileUrl: string) => void
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

    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (submitSucceeded) {
            props.reset();
        }
    }, [submitSucceeded]);

    const toggleIsUploading = (isUploading: boolean) => {
        setIsUploading(isUploading)
    };

    return (
        <form onSubmit={handleSubmit} className={style.post__form}>
            <div className={style.field}>
                <img className={s.avatar} src={avatar || defaultAvatar} alt="avatar"/>
                {createField<PostFormDataKeysType>({
                    component: Textarea,
                    customClassName: 'top',
                    name: 'text',
                    placeholder: `What's your mind? ${firstName}!`
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
