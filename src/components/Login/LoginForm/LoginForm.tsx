import React, {FC} from 'react';
import style from './LoginForm.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {email, required} from "../../../utils/validators";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {LoginFormData} from "../../../types/types";

type PropsType = {
    captchaURL: string | null
}

type LoginFormDataKeysType = Extract<keyof LoginFormData, string>

const LoginForm: FC<PropsType & InjectedFormProps<LoginFormData, PropsType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={style.field}>
                {createField<LoginFormDataKeysType>(Input, "email", [email, required], 'text', 'Your Email', 'left')}
            </div>
            <div className={style.field}>
                {createField<LoginFormDataKeysType>(Input, "password", [required], 'password', 'Password', 'left')}
            </div>
            <div className={style.remember}>
                <label>
                    {createField<LoginFormDataKeysType>('input', "rememberMe", undefined, 'checkbox')}
                    remember me
                </label>
            </div>
            {props.captchaURL && <div className={style.captcha}>
                <img src={props.captchaURL} alt="captcha"/>
                {createField<LoginFormDataKeysType>(Input, "captcha", [required], 'text', 'Symbols from image', 'captcha')}
            </div>}
            <button className={style.btn_login}>Login Now</button>
            {props.error && <div className={style.summaryError}>{props.error}</div>}
        </form>
    )
};

let LoginReduxForm = reduxForm<LoginFormData, PropsType>({form: 'login'})(LoginForm);

export default LoginReduxForm;