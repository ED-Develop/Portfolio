import React, {FC} from 'react';
import style from './Input.module.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLength} from "../../../../utils/validators";
import defaultAvatar from '../../../../assets/images/user.png';

let maxLength50 = maxLength(50);

type PropsType = {
    userId: number | null
    avatar: string | null
    login: string | null
    addMessage: (messageText: string, userId: number, login: string) => void
}
const Input: FC<PropsType> = ({addMessage, userId, avatar, login}) => {

    let onAddMessage = (formData: FormData) => {
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

type FormData = {
    messageText: string
}

const MessageForm: FC<InjectedFormProps<FormData>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field customClassName={'top'} component={Textarea} validate={[maxLength50]}
                   placeholder='Type your message...' name='messageText'/>
            <button>Send</button>
        </form>
    );
};

let MessageReduxForm = reduxForm<FormData>({form: 'message'})(MessageForm);

export default Input;