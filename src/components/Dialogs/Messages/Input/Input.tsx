import React, {FC} from 'react';
import style from './Input.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetObjectsKeys, Textarea} from "../../../common/forms-controls/FormsControls";
import {maxLength} from "../../../../utils/validators";
import defaultAvatar from '../../../../assets/images/user.png';

const maxLength50 = maxLength(50);

type PropsType = {
    userId: number | null
    avatar: string | null
    login: string | null
    addMessage: (messageText: string, userId: number, login: string) => void
}

const Input: FC<PropsType> = ({addMessage, userId, avatar, login}) => {
    const onAddMessage = (formData: DialogsFormData) => {
        if (userId && login) {
            addMessage(formData.messageText, userId, login);
        }
    };

    return (
        <div className={style.input}>
            <img src={avatar || defaultAvatar} alt="avatar"/>
            <MessageReduxForm onSubmit={onAddMessage}/>
        </div>
    );
};

type DialogsFormData = {
    messageText: string
}
type DialogsFormDataKeys = GetObjectsKeys<DialogsFormData>

const MessageForm: FC<InjectedFormProps<DialogsFormData>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<DialogsFormDataKeys>({
                component: Textarea,
                name: "messageText",
                type: 'text',
                customClassName: 'top',
                placeholder: 'Type your message...',
                validators: [maxLength50]
            })}
            <button>Send</button>
        </form>
    );
};

const MessageReduxForm = reduxForm<DialogsFormData>({form: 'message'})(MessageForm);

export default Input;
