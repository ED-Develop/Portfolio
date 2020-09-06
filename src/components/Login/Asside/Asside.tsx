import React from "react";
import style from '../Login.module.css';
import {Layout} from "antd";
import LoginReduxForm from "../LoginForm/LoginForm";
import {LoginFormData} from "../../../types/types";

const {Sider} = Layout;

type PropsType = {
    onSubmit: (formData: LoginFormData) => void
}


const LoginAside: React.FC<PropsType> = ({onSubmit}) => {
    return (
        <Sider width={'33%'} className={style.sider}>
            <div className={style.landing__sider}>
                <h3>Sign In</h3>
                <p>
                    Don't have an account.
                    <a href="/"> Sign Up</a>
                </p>
                <LoginReduxForm captchaURL={''} onSubmit={onSubmit}/>
                <a className={style.forgetLink} href="/">Forget your password</a>
            </div>
        </Sider>
    )
};

export default LoginAside;