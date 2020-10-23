import React, {Component} from 'react';
import './scss/App.scss';
import {BrowserRouter} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import Preloader from './components/common/preloader/Preloader';
import {appActions, initializeApp} from './redux/app/app-reducer';
import store, {AppStateType} from './redux/store';
import ErrorAlert from './components/common/error-alert/ErrorAlert';
import {BaseRoutes} from './components/routing/BaseRoutes';

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    initializeApp: () => void
    setGlobalError: (globalError: any) => void
}
type AppPropsType = MapStatePropsType & MapDispatchPropsType;

export type TAside = {
    width: string
    collapsedWidth: string
    isCollapsed: boolean
}

type LocalStateType = {
    aside: TAside
}

class AppContainer extends Component<AppPropsType, LocalStateType> {
    constructor(props: AppPropsType) {
        super(props);
        this.state = {
            aside: {
                width: '20%',
                collapsedWidth: '11%',
                isCollapsed: false
            }
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
            aside: {
                ...state.aside,
                isCollapsed: !state.aside.isCollapsed
            }
        }))
    };

    render() {
        if (!this.props.initialized) return <Preloader/>

        return (
            <>
                {this.props.globalError && <ErrorAlert message={this.props.globalError.message}/>}
                <BaseRoutes
                    aside={this.state.aside}
                    toggleIsAsideCollapsed={this.toggleIsAsideCollapsed}
                />
            </>
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
        <BrowserRouter>
            <Provider store={store}>
                <AppConnected/>
            </Provider>
        </BrowserRouter>
    )
};

export default App;
