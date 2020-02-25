import React, {FC} from 'react';
import style from './Login.module.css';
import LoginReduxForm from "./LoginForm/LoginForm";
import {connect} from "react-redux";
import {auth, login} from "../../Redux/authReducer";
import {Redirect} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../Redux/reduxStore";
import {LoginFormData} from "../../types/types";

type MapStatePropsType = {
    isAuth: boolean
    isFetching: boolean
    captchaURL: string | null
}

type MapDispatchPropsType = {
    login: (formData: LoginFormData) => void
    auth: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType


const Login: FC<PropsType> = ({login, isAuth, isFetching, captchaURL}) => {
    const onSubmit = (formData: LoginFormData) => {
        login(formData);
    };
    if (isAuth) {
        return <Redirect to='/'/>
    }
    return (
        <div className={style.container}>
            {isFetching && <Preloader/>}
            <div className={style.wrapper}>
                <div>
                    <div className={style.description}>
                        <h1>Find a cool job!!!</h1>
                        <p>Portfolio is a social network that helps you get a job.</p>
                        <p>So what are you waiting for? Start now.</p>
                    </div>
                </div>
                <div>
                    <div className={style.form}>
                        <h3>Login</h3>
                        <p>Log into your account</p>
                        <LoginReduxForm captchaURL={captchaURL} onSubmit={onSubmit}/>
                    </div>
                    <div className={style.form_background}>
                        <div>Login</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        isFetching: state.app.isFetching,
        captchaURL: state.auth.captchaURL
    }
};

export default connect<MapStatePropsType, MapDispatchPropsType, never, AppStateType>(mapStateToProps,
    {login, auth})(Login);