import React, {useEffect, useRef} from "react";
import style from './Comments.module.css';
import defaultAvatar from "../../../../../assets/images/user.png";
import {createField, GetObjectsKeys, Textarea} from "../../../../common/FormsControls/FormsControls";
import {Button, Tooltip} from "antd";
import {maxLength} from "../../../../../utils/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import {useClearFormAfterSubmit} from "../../../../../hook/useClearFormeAfterSubmit";
import {useScrollToRef} from "../../../../../hook/useScrollToRef";
import {CloseOutlined, EditOutlined} from "@ant-design/icons/lib";
import EditingInfo from "../../../../common/FormsControls/EditingInfo/EditingInfo";

export type CommentsFormPropsType = {
    avatar: string
    editMode: boolean
    isInputFocus: boolean
    disableInputFocus: () => void
    cancelEditing: () => void
}
export type TCommentsFormData = {
    comment: string
}
type CommentsFormKeys = GetObjectsKeys<TCommentsFormData>
type PropsType = CommentsFormPropsType & InjectedFormProps<TCommentsFormData, CommentsFormPropsType>

const maxLength50 = maxLength(50);

const CommentsForm: React.FC<PropsType> = ({handleSubmit, avatar, submitSucceeded, reset, editMode, ...props}) => {
    const formElement = useRef<HTMLFormElement>(null);
    const handleCancelEditing = () => props.cancelEditing();

    useClearFormAfterSubmit(submitSucceeded, reset);
    useScrollToRef(formElement, props.isInputFocus);

    return (
        <>
            {editMode && props.initialValues.comment && <EditingInfo
                handleCancelEditing={handleCancelEditing}
                textContent={props.initialValues.comment}
            />}
            <form ref={formElement} className={style.comments__form} onSubmit={handleSubmit}>
                <img className={style.avatar} src={avatar || defaultAvatar} alt="avatar"/>
                {createField<CommentsFormKeys>({
                    component: Textarea,
                    customClassName: 'top',
                    validators: [maxLength50],
                    name: 'comment',
                    placeholder: 'Write your comment',
                    props: {
                        className: style.field,
                        isFocus: props.isInputFocus,
                        toggleIsFocus: props.disableInputFocus
                    }
                })}
                <Button type='primary' htmlType='submit'>{editMode ? 'Edit' : 'Send'}</Button>
            </form>
        </>
    )
};

export default reduxForm<TCommentsFormData, CommentsFormPropsType>({enableReinitialize: true})(CommentsForm);
