import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Music from "./components/Music/Music";
import AsideContainer from "./components/Aside/AsideContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./Redux/appReducer";
import store from "./Redux/reduxStore";
import withSuspense from "./hoc/withSuspense";

const DialogsContainer = React.lazy( () => import ("./components/Dialogs/DialogsContainer"));
const Login = React.lazy( () => import ("./components/Login/Login"));
const People = React.lazy( () => import ("./components/People/People"));



class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-container">
                <HeaderContainer/>
                <Switch>
                    <Route path='/login' component={withSuspense(Login)}/>
                    {!this.props.isAuth && <Route exact path='/' component={withSuspense(Login)}/>}
                    <main className='app-main'>
                        <AsideContainer/>
                        <div className='app-content'>
                            {this.props.isAuth && <Route exact path='/' render={() => <ProfileContainer/>}/>}
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/messages' render={withSuspense(DialogsContainer)}/>
                            <Route path='/people' render={withSuspense(People)}/>
                            <Route path='/music' component={Music}/>

                        </div>
                    </main>
                </Switch>

            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        initialized: state.app.initialized
    }
};

let AppContainer = connect(mapStateToProps, {initializeApp})(App);

const PortfolioApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
};

export default PortfolioApp;