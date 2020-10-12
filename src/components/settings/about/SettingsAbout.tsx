import React from 'react';
import {SettingsForm} from '../form/SettingsForm';
import {TField} from '../../common/form/fieldsManager';
import {required} from '../../../utils/validators';
import {getProfileAbout} from '../../../redux/profile/profile-selector';
import {getUserProfile} from '../../../redux/profile/profile-reducer';

type TFormData = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

export const SettingsAbout = () => {
    const formModel: Array<TField<TFormData>> = [
        {
            name: 'fullName',
            label: 'Full Name',
            placeholder: 'Your name',
            type: 'text',
            validate: [required]
        },
        {
            name: 'aboutMe',
            label: 'General Information',
            placeholder: 'Information about you',
            type: 'textarea'
        },
        {
            name: 'lookingForAJob',
            label: 'I\'m looking for a job',
            type: 'checkbox'
        },
        {
            name: 'lookingForAJobDescription',
            label: 'Job description',
            placeholder: 'Information about job of your dream',
            type: 'textarea'
        }
    ];

    const handleSubmit = (value: TFormData) => {
        console.log(value);
    }

    return (
        <SettingsForm
            title='Contact Info'
            formName='about'
            formModel={formModel}
            handleSubmit={handleSubmit}
            action={getUserProfile}
            selector={getProfileAbout}
        />
    )
}