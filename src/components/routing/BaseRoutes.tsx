import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {url} from '../../utils/routeManager';
import MainRoutes from './MainRoutes';
import withSuspense from '../../hoc/withSuspense';
import {useSelector} from '../../hook/useSelector';
import {TAside} from '../../App';
import {NotFound} from '../common/layout/404/NotFound';

const Login = withSuspense(React.lazy(() => import ('../auth/login/Login')));

type PropsType = {
    aside: TAside
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

export const BaseRoutes: React.FC<PropsType> = ({aside, toggleIsAsideCollapsed}) => {
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <Switch>
            {isAuth ? authRedirects : notAuthRedirects}
            <Route path={url('login')} render={() => <Login/>}/>
            <Route path={url('404')} render={() => <NotFound/>}/>
            <Route
                path={url('base')}
                render={() => (
                    <MainRoutes
                        aside={aside}
                        toggleIsAsideCollapsed={toggleIsAsideCollapsed}
                    />
                )}
            />
        </Switch>
    )
};