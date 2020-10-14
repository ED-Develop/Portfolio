import React, {useMemo} from 'react';
import style from '../CustomFields.module.scss';
import {Field, WrappedFieldProps} from 'redux-form';
import {Form} from 'antd';
import {ValidatorsType} from '../../../../utils/validators';
import {CustomCheckbox} from '../fields/chekbox/CustomChekbox';
import {CustomInput} from '../fields/input/CustomInput';
import {CustomTextarea} from '../fields/textarea/CustomTextarea';

export type TFieldType = 'text' | 'password' | 'checkbox' | 'textarea'

export type FieldPropsType = {
    name: string
    label?: string
    error?: string
    validate?: Array<ValidatorsType>
    type?: TFieldType
    placeholder?: string
    disabled?: boolean
}

type ComponentPropsType = WrappedFieldProps & {
    name: string
    label?: string
    error?: string
    type?: TFieldType
    placeholder?: string
    required: boolean
    disabled?: boolean
};

const reduxFormField = (Component: React.ComponentType<any>): React.FC<FieldPropsType> => {
    const FieldComponent: React.FC<ComponentPropsType> = ({meta, input, label, type, error, ...props}) => {
        const isError = () => error || (meta.touched && meta.error) ? 'error' : 'success';
        const getHelpMessage = () => error || (meta.touched && meta.error);

        return (
            <Form.Item
                label={label}
                validateStatus={isError()}
                help={getHelpMessage()}
                labelCol={type === 'checkbox' ? {} : {span: 24}}
                required={props.required}
                className={style.field__label}

            >
                <Component
                    type={type}
                    {...input}
                    {...props}
                />
            </Form.Item>
        );
    }

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