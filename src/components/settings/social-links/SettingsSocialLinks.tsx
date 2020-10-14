import React from 'react';
import {SettingsForm} from '../form/SettingsForm';
import {TField} from '../../common/form/fieldsManager';
import {TContacts} from '../../../types/types';
import {getProfileLinks} from '../../../redux/profile/profile-selector';
import {getUserProfile, updateProfileData} from '../../../redux/profile/profile-reducer';
import {useDispatch} from 'react-redux';
import {FORM} from '../../../constants/forms';
import {link} from '../../../utils/validators';

export const SettingsSocialLinks = () => {
    const dispatch = useDispatch();

    const forModel: Array<TField<TContacts>> = [
        {
            name: 'facebook',
            type: 'text',
            placeholder: 'Facebook link',
            label: 'Facebook',
            validate: [link]
        },
        {
            name: 'instagram',
            type: 'text',
            placeholder: 'Instagram link',
            label: 'Instagram',
            validate: [link]
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
            label: 'Twitter',
            validate: [link]
        },
        {
            name: 'vk',
            type: 'text',
            placeholder: 'Vk link',
            label: 'Vk',
            validate: [link]
        },
        {
            name: 'youtube',
            type: 'text',
            placeholder: 'Youtube link',
            label: 'Youtube',
            validate: [link]
        },
        {
            name: 'mainLink',
            type: 'text',
            placeholder: 'Main link',
            label: 'Main Link',
            validate: [link]
        },
        {
            name: 'website',
            type: 'text',
            placeholder: 'Website link',
            label: 'Website',
            validate: [link]
        },
    ];

    const handleSubmit = (value: TContacts) => dispatch(updateProfileData({contacts: {...value}}));

    return (
        <SettingsForm
            title='Social Links'
            formName={FORM.socialLinks}
            formModel={forModel}
            handleSubmit={handleSubmit}
            selector={getProfileLinks}
            action={getUserProfile}
        />
    )
}