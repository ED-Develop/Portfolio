import React from 'react';
import AsideContainer from './aside/AsideContainer';
import {Redirect, Route, Switch} from 'react-router-dom';
import ProfileContainer from './profile/ProfileContainer';
import Projects from './Projects/Projects';
import withSuspense from '../hoc/withSuspense';
import {Layout} from 'antd';
import Preloader from './common/preloader/Preloader';
import HeaderContainer from './header/HeaderContainer';
import {Settings} from './settings/Settings';
import {url} from '../utils/routeManager';

const {Content} = Layout;
const DialogsContainer = withSuspense(React.lazy(() => import ('./dialogs/DialogsContainer')));
const People = withSuspense(React.lazy(() => import ('./people/PeopleContainer')));

type PropsType = {
    isAsideCollapsed: boolean
    isFetching: boolean
    toggleIsAsideCollapsed: () => void
}

const MainRoutes: React.FC<PropsType> = ({isAsideCollapsed, isFetching, toggleIsAsideCollapsed}) => {
    return (
        <>
            <HeaderContainer
                toggleIsAsideCollapsed={toggleIsAsideCollapsed}
                isAsideCollapsed={isAsideCollapsed}
            />
            <Layout className='app-main'>
                {isFetching && <Preloader/>}
                <AsideContainer collapsed={isAsideCollapsed}/>
                <Content className='app-content'>
                    <Switch>
                        <Redirect exact from={url('base')} to={url<'profile'>('profile', {userId: ''})}/>
                        <Route path={url('profile')} render={() => <ProfileContainer/>}/>
                        <Route path={url('messages')} render={() => <DialogsContainer/>}/>
                        <Route path={url('people')} render={() => <People/>}/>
                        <Route path={url('projects')} render={() => <Projects/>}/>
                        <Route path={url('settings')} render={() => <Settings/>}/>
                    </Switch>
                </Content>
            </Layout>
        </>
    )
};

export default MainRoutes;
