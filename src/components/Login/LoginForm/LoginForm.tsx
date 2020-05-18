import React, {FC} from 'react';
import style from './LoginForm.module.css';
import {InjectedFormProps, reduxForm} from "redux-form";
import {email, required} from "../../../utils/validators";
import {createField, CreateFieldOptionsType, GetObjectsKeys, Input} from "../../common/FormsControls/FormsControls";
import {LoginFormData} from "../../../types/types";

type PropsType = {
    captchaURL: string | null
}
type LoginFormDataKeysType = GetObjectsKeys<LoginFormData>;

const loginFieldsData: Array<CreateFieldOptionsType<LoginFormDataKeysType>> = [
    {name: 'email', placeholder: 'Your Email', validators: [email, required], component: Input},
    {name: 'password', placeholder: 'Password', type: 'password', validators: [required], component: Input},
    {name: 'rememberMe', type: 'checkbox', label: 'remember me', labelContainer: true, component: 'input'}
];

const LoginForm: FC<PropsType & InjectedFormProps<LoginFormData, PropsType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {
                loginFieldsData.map(field => {
                    return (
                        <div className={field.type === 'checkbox' ? style.remember : style.field}>
                            {createField<LoginFormDataKeysType>({
                                component: field.component,
                                name: field.name,
                                validators: field.validators,
                                placeholder: field.placeholder,
                                customClassName: field.customClassName,
                                type: field.type,
                                label: field.label,
                                labelContainer: true
                            })}
                        </div>
                    )
                })
            }
            {props.captchaURL && <div className={style.captcha}>
                <img src={props.captchaURL} alt="captcha"/>
                {createField<LoginFormDataKeysType>({
                    component: Input,
                    name: "captcha",
                    validators: [required],
                    placeholder: 'Symbols from image',
                    customClassName: 'captcha',
                    type: 'text'
                })}
            </div>}
            <button className={style.btn_login}>Login Now</button>
            {props.error && <div className={style.summaryError}>{props.error}</div>}
        </form>
    )
};

const LoginReduxForm = reduxForm<LoginFormData, PropsType>({form: 'login'})(LoginForm);

export default LoginReduxForm;
