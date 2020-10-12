import React, {useEffect} from 'react';
import style from '../Settings.module.scss';
import {Button} from 'antd';
import {fieldsManager, TField} from '../../common/form/fieldsManager';
import {ReduxForm} from '../../common/form/ReduxForm';
import {useDispatch} from 'react-redux';
import {ActionCreator} from 'redux';
import {Selector} from 'reselect';
import {AppStateType} from '../../../redux/store';
import {useSelector} from '../../../hook/useSelector';

type PropsType = {
    title: string
    formModel: Array<TField<any>>
    formName: string
    handleSubmit: (value: any) => void
    action?: ActionCreator<any>
    selector: Selector<AppStateType, any>
}

export const SettingsForm: React.FC<PropsType> = ({title, formModel, formName, handleSubmit, action, selector}) => {
    const dispatch = useDispatch();
    const initialValues = useSelector(selector);

    useEffect(() => {
        if (!initialValues && action) dispatch(action());
    }, []);

    return (
        <ReduxForm
            className={style.settings__form}
            form={formName}
            onSubmit={handleSubmit}
            initialValues={initialValues}
        >
            {
                () => (
                    <>
                        <div className={style.settings__formHeader}>{title}</div>
                        <div className={style.settings__formMain}>
                            {formModel.map(fieldsManager)}
                        </div>
                        <div className={style.settings__formFooter}>
                            <Button type='primary' htmlType='submit'>Save Changes</Button>
                        </div>
                    </>
                )
            }
        </ReduxForm>
    )
};