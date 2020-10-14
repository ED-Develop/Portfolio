import React from 'react';
import style from './DeleteAccount.module.scss';
import {Button, Modal} from 'antd';
import {NavLink} from 'react-router-dom';
import {CloseOutlined} from '@ant-design/icons/lib';
import {ReduxForm} from '../../common/form/ReduxForm';
import {fieldsManager, TField} from '../../common/form/fieldsManager';
import {useDispatch} from 'react-redux';
import {submit} from 'redux-form';
import {FORM} from '../../../constants/forms';
import {deleteAccount} from '../../../redux/auth/auth-reducer';

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

    const handleClick = () => dispatch(submit(FORM.deleteAccount));

    return (
        <Modal
            title={<h4 className={style.modalForm__title}>Please confirm account deleting</h4>}
            closeIcon={<NavLink to='/settings' className={style.modalForm__close}><CloseOutlined/></NavLink>}
            footer={<Button className={style.modalForm__btn} type='primary' onClick={handleClick}>Delete</Button>}
            visible
            centered
            className={style.modalForm}
        >
            <ReduxForm
                onSubmit={handleSubmit}
                form={FORM.deleteAccount}
            >
                {
                    ({error}) => (
                        <>
                            <p>You have to type your email to delete an account</p>
                            {
                                formData.map(field => error
                                    ? fieldsManager({...field, error: error?.join(' ')})
                                    : fieldsManager(field))
                            }
                        </>
                    )
                }
            </ReduxForm>
        </Modal>

    )
};