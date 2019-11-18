import React from 'react';
import style from './Login.module.css';
import LoginReduxForm from "./LoginForm/LoginForm";
import {connect} from "react-redux";
import {auth, login} from "../../Redux/authReducer";
import {Redirect} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";


const Login = ({login, isAuth, isFetching}) => {
    const onSubmit = (formData) => {
        login(formData);
    };
    if (isAuth) {
        return <Redirect to='/'/>
    }
    return (
        <div className={style.container}>
            {isFetching && <Preloader/>}
            <div className={style.wrapper}>
                <div><h1>Description</h1></div>
                <div>
                    <div className={style.form}>
                        <h3>Login</h3>
                        <p>Log into your account</p>
                        <LoginReduxForm onSubmit={onSubmit}/>
                    </div>
                    <div className={style.form_background}>
                        <div>Login</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isFetching: state.peoplePage.isFetching
    }
};

export default connect(mapStateToProps, {login, auth})(Login);