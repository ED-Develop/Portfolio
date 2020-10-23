import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {url} from '../../../utils/routeManager';
import {ProjectsForm} from '../form/ProjectsForm';

export const ProjectRoutes = () => {
    return (
        <Switch>
            <Route path={url('projects:add')} render={() => <ProjectsForm/>}/>
            <Route path={url('projects:update')} render={() => <ProjectsForm/>}/>
        </Switch>
    )
};