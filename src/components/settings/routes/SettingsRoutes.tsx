import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {SettingsAbout} from '../about/SettingsAbout';
import {SettingsSocialLinks} from '../social-links/SettingsSocialLinks';
import {DeleteAccount} from '../delete-account/DeleteAccount';

export const SettingsRoutes = () => {
    return (
        <Switch>
            <Route path='/settings/links' render={() => <SettingsSocialLinks/>}/>
            <Route path='/settings/delete' render={() => <DeleteAccount/>}/>
            <Route path='/settings' render={() => <SettingsAbout/>}/>
        </Switch>
    )
}