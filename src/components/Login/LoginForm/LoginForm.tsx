import React, {FC} from 'react';
import style from './LoginForm.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {email, required} from "../../../utils/validators";
import {Input} from "../../common/FormsControls/FormsControls";
import {LoginFormData} from "../../../types/types";

type PropsType = {
    captchaURL: string | null
}

const LoginForm: FC<any & InjectedFormProps<LoginFormData, PropsType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={style.field}>
                <Field validate={[email, required]} customClassName={'left'} component={Input} name={'email'}
                       placeholder={'Your Email'}/>
            </div>
            <div className={style.field}>
                <Field validate={[required]} customClassName={'left'} component={Input} name={'password'}
                       placeholder={'Password'} type={"password"}/>
            </div>
            <div className={style.remember}>
                <label><Field component="input" name={'rememberMe'} type={"checkbox"}/>remember me</label>
            </div>
            {props.captchaURL && <div className={style.captcha}>
                <img src={props.captchaURL} alt="captcha"/>
                <Field validate={[required]} customClassName={'captcha'} component={Input} name={'captcha'}
                       placeholder={'Symbols from image'} />
            </div>}
            <button className={style.btn_login}>Login Now</button>
            {props.error && <div className={style.summaryError}>{props.error}</div>}
        </form>
    )
};

let LoginReduxForm = reduxForm<LoginFormData, PropsType>({form: 'login'})(LoginForm);

export default LoginReduxForm;