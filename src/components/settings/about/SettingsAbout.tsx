import React from 'react';
import {SettingsForm} from '../form/SettingsForm';
import {TField} from '../../common/form/fieldsManager';
import {maxLength, required} from '../../../utils/validators';
import {getProfileAbout} from '../../../redux/profile/profile-selector';
import {getUserProfile, updateProfileData} from '../../../redux/profile/profile-reducer';
import {useDispatch} from 'react-redux';
import {FORM} from '../../../constants/forms';
import {useSelector} from '../../../hook/useSelector';
import {getFormValues} from 'redux-form';

type TFormData = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

export const SettingsAbout = () => {
    const dispatch = useDispatch();
    const formValue = useSelector(getFormValues(FORM.settingsAbout)) as TFormData;

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
            type: 'textarea',
            validate: [maxLength(250)]
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
            type: 'textarea',
            disabled: !formValue?.lookingForAJob,
            validate: [maxLength(250)]
        }
    ];

    const handleSubmit = (value: TFormData) => dispatch(updateProfileData({...value}));

    return (
        <SettingsForm
            title='Contact Info'
            formName={FORM.settingsAbout}
            formModel={formModel}
            handleSubmit={handleSubmit}
            action={getUserProfile}
            selector={getProfileAbout}
        />
    )
}