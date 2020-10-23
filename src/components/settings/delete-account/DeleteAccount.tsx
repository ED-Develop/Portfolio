import React from 'react';
import {TField} from '../../common/form/fieldsManager';
import {useDispatch} from 'react-redux';
import {FORM} from '../../../constants/forms';
import {deleteAccount} from '../../../redux/auth/auth-reducer';
import {url} from '../../../utils/routeManager';
import {ModalForm} from '../../common/form/modal/ModalForm';

export type TDeleteAccountFormData = {
    email: string
}

export const DeleteAccount = () => {
    const dispatch = useDispatch();

    const handleSubmit = (value: TDeleteAccountFormData) => {
        dispatch(deleteAccount({...value}));
    }

    const formData: Array<TField<TDeleteAccountFormData>> = [
        {name: 'email', type: 'text', placeholder: 'Your Email'}
    ];

    return (
        <ModalForm
            title='Please confirm account deleting'
            closePath={url('settings')}
            handleSubmit={handleSubmit}
            formModel={formData}
            formName={FORM.deleteAccount}
        />
    )
};