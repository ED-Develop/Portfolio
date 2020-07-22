import React, {Component} from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {appActions, initializeApp} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/store";
import withSuspense from "./hoc/withSuspense";
import ModalWindow from "./components/common/ModalWindow/ModalWindow";
import MainRoutes from "./components/MainRoutes";

const Login = withSuspense(React.lazy(() => import ("./components/Login/Login")));

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    initializeApp: () => void
    setGlobalError: (globalError: any) => void
}
type AppPropsType = MapStatePropsType & MapDispatchPropsType;
type LocalStateType = {
    isAsideCollapsed: boolean
}

class AppContainer extends Component<AppPropsType, LocalStateType> {
    constructor(props: AppPropsType) {
        super(props);
        this.state = {
            isAsideCollapsed: false
        }
    }

    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
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

    toggleIsAsideCollapsed = () => {
        this.setState(state => ({
            ...state,
            isAsideCollapsed: !state.isAsideCollapsed
        }))
    };

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        const Modal = (
            <ModalWindow modalTitle='Global Error' hideModalWindow={this.hideModalWindow}>
                <p>Oops! Some error occurred, please check your Internet connection and try again.</p>
            </ModalWindow>
        );

        return (
            <div className="app-container">
                {this.props.globalError && Modal}
                <HeaderContainer
                    toggleIsAsideCollapsed={this.toggleIsAsideCollapsed}
                    isAsideCollapsed={this.state.isAsideCollapsed}
                />
                <Switch>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route
                        path='/'
                        render={() => (
                            <MainRoutes
                                isAsideCollapsed={this.state.isAsideCollapsed}
                                isFetching={this.props.isFetching}
                            />
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    initialized: state.app.initialized,
    globalError: state.app.globalError,
    isFetching: state.app.isFetching
});

const AppConnected = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    {initializeApp, setGlobalError: appActions.setGlobalError})(AppContainer);

const App: React.FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppConnected/>
            </Provider>
        </HashRouter>
    )
};

export default App;
