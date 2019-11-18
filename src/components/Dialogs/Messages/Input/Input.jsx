import React from 'react';
import style from './Input.module.css'
import {Field,reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLength} from "../../../../utils/validators";

let maxLength50 = maxLength(50);

const Input = ({addMessage, userId}) => {

    let onAddMessage = (formData) => {
        addMessage(formData.messageText, userId);
    };

    return (
        <div className={style.input}>
            <img src="https://klv-oboi.ru/img/gallery/29/thumbs/thumb_l_15614.jpg" alt="avatar"/>
                <MessageReduxForm onSubmit={onAddMessage}/>
        </div>
    );
};

const MessageForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field component={Textarea} validate={[maxLength50]} placeholder='Type your message...' name='messageText'/>
            <button>Send</button>
        </form>
    );
};

let MessageReduxForm = reduxForm({form: 'message'})(MessageForm);

export default Input;