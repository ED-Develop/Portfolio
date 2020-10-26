import style from './AuthForm.module.scss';
import {fieldsManager, TField} from '../../common/form/fieldsManager';
import {Button} from 'antd';
import React from 'react';
import {ReduxForm} from '../../common/form/ReduxForm';

type PropsType = {
    handleSubmit: (value: any) => void
    formModel: Array<TField<any>>
    formName: string
    btnText?: string
    initialValues?: any
}

export const AuthForm: React.FC<PropsType> = ({handleSubmit, formModel, children, formName, btnText, initialValues}) => {
    return (
        <ReduxForm
            onSubmit={handleSubmit}
            className={style.landing__form}
            initialValues={initialValues}
            form={formName}
        >
            {
                ({error}) => {
                    return (
                        <>
                            {error?.length && <div className={style.summaryError}>{error}!</div>}
                            {formModel.map(fieldsManager)}
                            {children}
                            <Button htmlType='submit' type='primary' className={style.btn_login}>
                                {btnText || 'Submit'}
                            </Button>
                        </>
                    )
                }
            }
        </ReduxForm>
    )
};