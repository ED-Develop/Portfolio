import React, {Component} from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Projects from "./components/Projects/Projects";
import AsideContainer from "./components/Aside/AsideContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp, setGlobalError} from "./Redux/appReducer";
import store, {AppStateType} from "./Redux/reduxStore";
import withSuspense from "./hoc/withSuspense";
import ModalWindow from "./components/common/ModalWindow/ModalWindow";

const DialogsContainer = React.lazy((): Promise<any> => import ("./components/Dialogs/DialogsContainer"));
const Login = React.lazy((): Promise<any> => import ("./components/Login/Login"));
const People = React.lazy((): Promise<any> => import ("./components/People/People"));
const Edit = React.lazy((): Promise<any> => import ("./components/Edit/Edit"));

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
                    <Route path='/login' render={() => withSuspense(Login)}/>
                    <Route path='/' render={MainApp}/>
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
    {initializeApp, setGlobalError})(AppContainer);


const MainApp = () => {
    return (
        <main className='app-main'>
            <AsideContainer/>
            <div className='app-content'>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to='/profile'/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/messages/:userId?' render={() => withSuspense(DialogsContainer)}/>
                    <Route path='/people' render={ () => withSuspense(People)}/>
                    <Route path='/projects' render={() => <Projects/>}/>
                    <Route path='/edit' render={() => withSuspense(Edit)}/>
                </Switch>
            </div>
        </main>
    )
};

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