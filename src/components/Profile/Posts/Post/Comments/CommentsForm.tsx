import React from "react";
import style from './Comments.module.css';
import defaultAvatar from "../../../../../assets/images/user.png";
import {createField} from "../../../../common/FormsControls/FormsControls";
import {Button, Input} from "antd";
import {maxLength} from "../../../../../utils/validators";
import {InjectedFormProps, reduxForm} from "redux-form";

type PropsType = {
    avatar: string
}

type CommentsFormData = {
    comments: string
}

const maxLength50 = maxLength(50);

const CommentsForm: React.FC<PropsType & InjectedFormProps<CommentsFormData, PropsType>> = ({avatar}) => {
    return (
        <form className={style.comments__form}>
            <img className={style.avatar} src={avatar || defaultAvatar} alt="avatar"/>
            {createField({
                component: (props) => <Input.TextArea {...props} />,
                customClassName: 'top',
                validators: [maxLength50],
                name: 'comment',
                placeholder: 'Write your comment'
            })}
            <Button type='primary'>Send</Button>
        </form>
    )
};

export default reduxForm<CommentsFormData, PropsType>({form: 'comments'})(CommentsForm);
