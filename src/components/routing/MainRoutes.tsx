import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ProfileContainer from '../profile/ProfileContainer';
import Projects from '../projects/Projects';
import withSuspense from '../../hoc/withSuspense';
import {Layout} from 'antd';
import Preloader from '../common/preloader/Preloader';
import HeaderContainer from '../header/HeaderContainer';
import {Settings} from '../settings/Settings';
import {url} from '../../utils/routeManager';
import {useSelector} from '../../hook/useSelector';
import {ContentWrapper} from '../common/layout/ContentWrapper';
import {TAside} from '../../App';
import Aside from '../aside/Aside';
import {ComingSoon} from '../common/layout/coming-soon/ComingSoon';

const People = withSuspense(React.lazy(() => import ('../people/PeopleContainer')));
const ChatPage = withSuspense(React.lazy(() => import('../../pages/chat/ChatPage')));

type PropsType = {
    aside: TAside
    toggleIsAsideCollapsed: () => void
}

const MainRoutes: React.FC<PropsType> = ({aside, toggleIsAsideCollapsed}) => {
    const isFetching = useSelector(state => state.app.isFetching);

    return (
        <>
            <HeaderContainer
                toggleIsAsideCollapsed={toggleIsAsideCollapsed}
                aside={aside}
            />
            <Layout className='app-main'>
                {isFetching && <Preloader/>}
                <Aside aside={aside}/>
                <ContentWrapper>
                    <Switch>
                        <Route path={url('profile')} render={() => <ProfileContainer/>}/>
                        <Route path={url('messages')} render={() => <ComingSoon isFullScreen/>}/>
                        <Route path={url('chat')} render={() => <ChatPage/>}/>
                        <Route path={url('people')} render={() => <People/>}/>
                        <Route path={url('projects')} render={() => <Projects/>}/>
                        <Route path={url('settings')} render={() => <Settings/>}/>
                        <Redirect exact from={url('base')} to={url('profile', {userId: null})}/>
                        <Redirect to={url('404')}/>
                    </Switch>
                </ContentWrapper>
            </Layout>
        </>
    )
};

export default MainRoutes;
