import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {SettingsAbout} from '../about/SettingsAbout';
import {SettingsSocialLinks} from '../social-links/SettingsSocialLinks';

export const SettingsRoutes = () => {
    return (
        <Switch>
            <Route path='/settings' render={() => <SettingsAbout/>} exact/>
            <Route path='/settings/links' render={() => <SettingsSocialLinks/>}/>
        </Switch>
    )
}