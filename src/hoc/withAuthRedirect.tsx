import React, {Component, FC} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/reduxStore";

type MapStatePropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
};

let withAuthRedirect = (Component: React.ComponentType) => {
    let RedirectComponent: FC<MapStatePropsType> = (props) => {
        if (!props.isAuth) return <Redirect to='/login'/>;

        return <Component {...props}/>
    };

    return connect<MapStatePropsType, unknown, unknown, AppStateType>(mapStateToProps)(RedirectComponent);
};

export default withAuthRedirect;