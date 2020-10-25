import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {url} from '../../../utils/routeManager';
import PostsContainer from '../posts/PostsContainer';
import {ComingSoon} from '../../common/layout/coming-soon/ComingSoon';

type PropsType = {
    isMyProfile: boolean
}

export const ProfileRoutes: React.FC<PropsType> = ({isMyProfile}) => {
    return (
        <Switch>
            <Redirect
                from={url('profile', {userId: null})}
                to={url('profile:timeline', {userId: null})}
                exact
            />
            <Route
                path={url('profile:timeline')}
                render={() => <PostsContainer isMyProfile={isMyProfile}/>}
            />
            <Route
                path={url('profile:photos')}
                render={() => <ComingSoon/>}
            />
            <Route
                path={url('profile:videos')}
                render={() => <ComingSoon/>}
            />
        </Switch>
    )
}