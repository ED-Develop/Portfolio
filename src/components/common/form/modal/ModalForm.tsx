import React from 'react';
import style from '../../../settings/delete-account/DeleteAccount.module.scss';
import {NavLink} from 'react-router-dom';
import {CloseOutlined} from '@ant-design/icons/lib';
import {Button, Modal} from 'antd';
import {ReduxForm} from '../ReduxForm';
import {fieldsManager, TField} from '../fieldsManager';
import {submit} from 'redux-form';
import {useDispatch} from 'react-redux';

type PropsType = {
    title: string
    closePath: string
    handleSubmit: (value: any) => void
    formModel: Array<TField<any>>
    description?: string
    formName: string
    submitBtnText?: string
    initialValues?: any
}

export const ModalForm: React.FC<PropsType> = ({title, closePath, handleSubmit, formModel, description, formName, ...props}) => {
    const dispatch = useDispatch();

    const handleClick = () => dispatch(submit(formName));

    return (
        <Modal
            title={<h4 className={style.modalForm__title}>{title}</h4>}
            closeIcon={<NavLink to={closePath} className={style.modalForm__close}><CloseOutlined/></NavLink>}
            footer={
                <Button className={style.modalForm__btn} type='primary' onClick={handleClick}>
                    {props.submitBtnText || 'Submit'}
                </Button>
            }
            visible
            centered
            className={style.modalForm}
        >
            <ReduxForm
                onSubmit={handleSubmit}
                form={formName}
                initialValues={props.initialValues}
                enableReinitialize
            >
                {
                    ({error}) => (
                        <>
                            {description && description}
                            {
                                formModel.map(field => error
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