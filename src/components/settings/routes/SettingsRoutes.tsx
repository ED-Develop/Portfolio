import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {SettingsAbout} from '../about/SettingsAbout';
import {SettingsSocialLinks} from '../social-links/SettingsSocialLinks';
import {DeleteAccount} from '../delete-account/DeleteAccount';
import {url} from '../../../utils/routeManager';

export const SettingsRoutes = () => {
    return (
        <Switch>
            <Route path={url('settings:links')} render={() => <SettingsSocialLinks/>}/>
            <Route path={url('settings:delete')} render={() => <DeleteAccount/>}/>
            <Route path={url('settings')} render={() => <SettingsAbout/>}/>
        </Switch>
    )
}