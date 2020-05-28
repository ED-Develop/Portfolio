import React, {FC} from 'react';
import style from './PostForm.module.css';
import {InjectedFormProps, reduxForm, reset} from "redux-form";
import {createField, GetObjectsKeys, Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLength} from "../../../../utils/validators";
import {Button} from "antd";
import s from "../Posts.module.css";
import defaultAvatar from "../../../../assets/images/user.png";
import UploadInput, {UploadInputPropsType} from "./UploadInput";
import {TPostFormData} from "../../../../types/types";

const maxLength50 = maxLength(50);

type PropsType = {
    firstName: string | null
    avatar: string | null
    uploadFile: (file: File) => void
}

type PostFormDataKeysType = GetObjectsKeys<TPostFormData>;

const PostsForm: FC<PropsType & InjectedFormProps<TPostFormData, PropsType>> = (props) => {
    const {handleSubmit, firstName, avatar, uploadFile} = props;

    return (
        <form onSubmit={handleSubmit} className={style.post__form}>
            <div className={style.field}>
                <img className={s.avatar} src={avatar || defaultAvatar} alt="avatar"/>
                {createField<PostFormDataKeysType>({
                    component: Textarea,
                    customClassName: 'top',
                    validators: [maxLength50],
                    name: 'text',
                    placeholder: `What's your mind? ${firstName}!`
                })}
            </div>
            <div className={style.buttons}>
                {createField<PostFormDataKeysType, UploadInputPropsType>({
                    component: UploadInput,
                    name: 'photos',
                    props: {
                        uploadFile
                    }
                })}
                <Button className={style.accessBtn}>Access</Button>
                <Button type='primary' className={style.shareBtn} htmlType='submit'>Share</Button>
            </div>
        </form>
    );
};

export default reduxForm<TPostFormData, PropsType>({
    form: 'myPost',
    onSubmitSuccess: (result, dispatch) => {
        dispatch(reset('myPost'))
    },
    initialValues: {
        text: '',
        photos: []
    }
})(PostsForm);
