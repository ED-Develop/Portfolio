import React from 'react';
import {SettingsForm} from '../form/SettingsForm';
import {TField} from '../../common/form/fieldsManager';
import {TContacts} from '../../../types/types';
import {getProfileLinks} from '../../../redux/profile/profile-selector';
import {getUserProfile} from '../../../redux/profile/profile-reducer';

export const SettingsSocialLinks = () => {
    const forModel: Array<TField<TContacts>> = [
        {
            name: 'facebook',
            type: 'text',
            placeholder: 'Facebook link',
            label: 'Facebook'
        },
        {
            name: 'instagram',
            type: 'text',
            placeholder: 'Instagram link',
            label: 'Instagram'
        },
        {
            name: 'github',
            type: 'text',
            placeholder: 'Github link',
            label: 'Github'
        },
        {
            name: 'twitter',
            type: 'text',
            placeholder: 'Twitter link',
            label: 'Twitter'
        },
        {
            name: 'vk',
            type: 'text',
            placeholder: 'Vk link',
            label: 'Vk'
        },
        {
            name: 'youtube',
            type: 'text',
            placeholder: 'Youtube link',
            label: 'Youtube'
        },
        {
            name: 'mainLink',
            type: 'text',
            placeholder: 'Main link',
            label: 'Main Link'
        },
        {
            name: 'website',
            type: 'text',
            placeholder: 'Website link',
            label: 'Website'
        },
    ];

    const handleSubmit = (value: TContacts) => {

    }

    return (
        <SettingsForm
            title='Social Links'
            formName='socialLinks'
            formModel={forModel}
            handleSubmit={handleSubmit}
            selector={getProfileLinks}
            action={getUserProfile}
        />
    )
}