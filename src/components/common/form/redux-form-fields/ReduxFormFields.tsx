import React, {useMemo} from 'react';
import style from '../CustomFields.module.scss';
import {Field, WrappedFieldProps} from 'redux-form';
import {Form} from 'antd';
import {ValidatorsType} from '../../../../utils/validators';
import {WrappedFieldMetaProps} from 'redux-form/lib/Field';
import {CustomCheckbox} from '../fields/chekbox/CustomChekbox';
import {CustomInput} from '../fields/input/CustomInput';
import {CustomTextarea} from '../fields/textarea/CustomTextarea';

export type TFieldType = 'text' | 'password' | 'checkbox' | 'textarea'

export type FieldPropsType = {
    name: string
    label?: string
    validate?: Array<ValidatorsType>
    type?: TFieldType
    placeholder?: string
}

type ComponentPropsType = {
    name: string
    label?: string
    type?: TFieldType
    placeholder?: string
    required: boolean
}

const reduxFormField = (Component: React.ComponentType<any>): React.FC<FieldPropsType> => {
    const isError = (meta: WrappedFieldMetaProps) => meta.touched && meta.error ? 'error' : 'success';

    const FieldComponent: React.FC<WrappedFieldProps & ComponentPropsType> = ({meta, input, label, type, required, ...props}) => (
        <Form.Item
            label={label}
            validateStatus={isError(meta)}
            help={meta.touched && meta.error}
            labelCol={type === 'checkbox' ? {} : {span: 24}}
            required={required}
            className={style.field__label}

        >
            <Component
                type={type}
                {...input}
                {...props}
            />
        </Form.Item>
    );

    return ({name, validate, ...props}) => {
        const isRequired = useMemo(() => {
            return validate?.some(fn => fn.name === 'required');
        }, [validate]);

        return (
            <Field
                name={name}
                validate={validate}
                component={FieldComponent}
                required={isRequired}
                {...props}
            />
        )
    }
};

export const ReduxFormInput = reduxFormField(CustomInput);
export const ReduxFormCheckbox = reduxFormField(CustomCheckbox);
export const ReduxFormTextarea = reduxFormField(CustomTextarea);