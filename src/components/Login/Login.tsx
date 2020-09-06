import React, {FC} from 'react';
import style from './Login.module.css';
import {connect} from 'react-redux';
import {auth, login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/store';
import {LoginFormData} from '../../types/types';
import {Banner} from './Banner/Banner';
import {Layout} from 'antd';
import LoginAside from './Asside/Asside';

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
    const onSubmit = (formData: LoginFormData) => login(formData);

    if (isAuth) return <Redirect to='/'/>;

    return (
        <Layout className={style.container}>
            <Banner/>
            <LoginAside onSubmit={onSubmit}/>
        </Layout>
    )
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    isFetching: state.app.isFetching,
    captchaURL: state.auth.captchaURL
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    {login, auth})(Login);
