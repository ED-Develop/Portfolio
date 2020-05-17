import React, {Component, FC} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/reduxStore";

type InjectedProps = {
    isAuth: boolean
}

function withAuthRedirect<P extends InjectedProps> (Component: React.ComponentType<P>){

    let mapStateToProps = (state: AppStateType) => {
        return {
            isAuth: state.auth.isAuth
        }
    };

    type MapStatePropsType = ReturnType<typeof mapStateToProps>

    const RedirectComponent: FC<MapStatePropsType> = (props) => {
        if (!props.isAuth) return <Redirect to='/login'/>;

        return <Component {...props as P}/>
    };


    return connect<MapStatePropsType, never, P, AppStateType>(mapStateToProps)(RedirectComponent);
}

export default withAuthRedirect;
