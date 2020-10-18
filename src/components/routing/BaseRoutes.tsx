import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {url} from '../../utils/routeManager';
import MainRoutes from './MainRoutes';
import withSuspense from '../../hoc/withSuspense';
import {useSelector} from '../../hook/useSelector';

const Login = withSuspense(React.lazy(() => import ('../auth/login/Login')));

type PropsType = {
    isAsideCollapsed: boolean
    toggleIsAsideCollapsed: () => void
}

export const addRedirects = (from: Array<string>, to: string) => {
    return from.map(fromPath => <Redirect key={fromPath} from={fromPath} to={to}/>);
};

const authRedirects = addRedirects([url('login')], url('base'));

const notAuthRedirects = addRedirects([
    url('profile'),
    url('messages'),
    url('settings'),
    url('projects'),
    url('people')
], url('login'));

export const BaseRoutes: React.FC<PropsType> = ({isAsideCollapsed, toggleIsAsideCollapsed}) => {
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <Switch>
            {isAuth ? authRedirects : notAuthRedirects}
            <Route path={url('login')} render={() => <Login/>}/>
            <Route
                path={url('base')}
                render={() => (
                    <MainRoutes
                        isAsideCollapsed={isAsideCollapsed}
                        toggleIsAsideCollapsed={toggleIsAsideCollapsed}
                    />
                )}
            />
        </Switch>
    )
};