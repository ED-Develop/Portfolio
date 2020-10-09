import React, {Component} from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import {connect, Provider} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {appActions, initializeApp} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/store";
import withSuspense from "./hoc/withSuspense";
import MainRoutes from "./components/MainRoutes";
import ErrorAlert from "./components/common/ErrorAlert/ErrorAlert";

const Login = withSuspense(React.lazy(() => import ("./components/auth/login/Login")));

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
        if (!this.props.initialized) return <Preloader/>

        return (
            <div className="app-container">
                {this.props.globalError && <ErrorAlert message={this.props.globalError.message}/>}
                <Switch>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route
                        path='/'
                        render={() => (
                            <MainRoutes
                                isAsideCollapsed={this.state.isAsideCollapsed}
                                isFetching={this.props.isFetching}
                                toggleIsAsideCollapsed={this.toggleIsAsideCollapsed}
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
