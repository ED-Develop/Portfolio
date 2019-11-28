import React from 'react';
import style from './Input.module.css'
import {Field,reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLength} from "../../../../utils/validators";
import defaultAvatar from '../../../../assets/images/user.png';

let maxLength50 = maxLength(50);

const Input = ({addMessage, userId, avatar, login}) => {

    let onAddMessage = (formData) => {
        addMessage(formData.messageText, userId, login);
    };

    return (
        <div className={style.input}>
            <img src={avatar || defaultAvatar} alt="avatar"/>
                <MessageReduxForm onSubmit={onAddMessage}/>
        </div>
    );
};

const MessageForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field castomClassName={'top'} component={Textarea} validate={[maxLength50]} placeholder='Type your message...' name='messageText'/>
            <button>Send</button>
        </form>
    );
};

let MessageReduxForm = reduxForm({form: 'message'})(MessageForm);

export default Input;