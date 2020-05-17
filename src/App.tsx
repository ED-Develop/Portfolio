import React, {Component} from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {appActions, initializeApp} from "./Redux/appReducer";
import store, {AppStateType} from "./Redux/reduxStore";
import withSuspense from "./hoc/withSuspense";
import ModalWindow from "./components/common/ModalWindow/ModalWindow";
import MainRoutes from "./components/MainRoutes";

const Login = withSuspense(React.lazy((): Promise<any> => {
    return import ("./components/Login/Login");
}));

type MapStatePropsType = {
    isAuth: boolean
    initialized: boolean
    globalError: any
}

type MapDispatchPropsType = {
    initializeApp: () => void
    setGlobalError: (globalError: any) => void
}

type AppPropsType = MapStatePropsType & MapDispatchPropsType;

class AppContainer extends Component<AppPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        this.props.setGlobalError(promiseRejectionEvent);
    };

    hideModalWindow = () => {
        this.props.setGlobalError(null);
    };

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }
    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        const Modal = (<ModalWindow modalTitle='Global Error'
                                    hideModalWindow={this.hideModalWindow}>
            <p>Oops! Some error occurred, please check your Internet connection and try again.</p>
        </ModalWindow>);

        return (
            <div className="app-container">
                {this.props.globalError && Modal}
                <HeaderContainer/>
                <Switch>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/' render={() => <MainRoutes/>}/>
                </Switch>
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        initialized: state.app.initialized,
        globalError: state.app.globalError
    }
};

const AppConnected = connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps,
    {initializeApp, setGlobalError: appActions.setGlobalError})(AppContainer);


const App = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppConnected/>
            </Provider>
        </HashRouter>
    )
};

export default App;
