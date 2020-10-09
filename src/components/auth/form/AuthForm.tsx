import style from './AuthForm.module.scss';
import {fieldsManager, TField} from '../../common/form/fieldsManager';
import {Button} from 'antd';
import React from 'react';
import {ReduxForm} from '../../common/form/ReduxForm';

type PropsType = {
    handleSubmit: (value: any) => void
    formModel: Array<TField<any>>
    formName: string
}

export const AuthForm: React.FC<PropsType> = ({handleSubmit, formModel, children, formName}) => {
    return (
        <ReduxForm
            onSubmit={handleSubmit}
            className={style.landing__form}
            form={formName}
        >
            {formModel.map(fieldsManager)}
            {children}
            <Button htmlType='submit' type='primary' className={style.btn_login}>Get Started</Button>
            {/*{props.error && <div className={style.summaryError}>{props.error}</div>}*/}
        </ReduxForm>
    )
};