import React, {useMemo} from 'react';
import style from '../CustomFields.module.scss';
import cn from 'classnames';
import {Field, WrappedFieldProps} from 'redux-form';
import {Form} from 'antd';
import {ValidatorsType} from '../../../../utils/validators';
import {CustomCheckbox} from '../fields/chekbox/CustomChekbox';
import {CustomInput} from '../fields/input/CustomInput';
import {CustomTextarea} from '../fields/textarea/CustomTextarea';
import {FirebaseUploadInput} from '../fields/upload/FirebaseUploadInput';
import {AddInput} from '../fields/add-input/AddInput';

export type TFieldType = 'text' | 'password' | 'checkbox' | 'textarea' | 'file' | 'add'

export type FieldPropsType = {
    name: string
    label?: string
    error?: string
    validate?: Array<ValidatorsType>
    type?: TFieldType
    placeholder?: string
    disabled?: boolean
    storage?: string
    multiple?: boolean
    wrapperClassName?: string
    className?: string
}

type ComponentPropsType = Omit<FieldPropsType, 'validate'> & WrappedFieldProps & {
    required: boolean
};

const reduxFormField = (Component: React.ComponentType<any>): React.FC<FieldPropsType> => {
    const FieldComponent: React.FC<ComponentPropsType> = ({
                                                              meta,
                                                              input,
                                                              label,
                                                              type,
                                                              error,
                                                              wrapperClassName,
                                                              ...props
                                                          }) => {
        const isError = () => error || (meta.touched && meta.error) ? 'error' : 'success';
        const getHelpMessage = () => error || (meta.touched && meta.error);
        const metaProps = () => ['file'].some(i => i === type) ? meta : {};

        return (
            <Form.Item
                label={label}
                validateStatus={isError()}
                help={getHelpMessage()}
                labelCol={type === 'checkbox' ? {} : {span: 24}}
                required={props.required}
                className={cn(style.field__label, wrapperClassName)}

            >
                <Component
                    type={type}
                    {...input}
                    {...props}
                    {...metaProps()}
                />
            </Form.Item>
        );
    };

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
        );
    };
};

export const ReduxFormInput = reduxFormField(CustomInput);
export const ReduxFormCheckbox = reduxFormField(CustomCheckbox);
export const ReduxFormTextarea = reduxFormField(CustomTextarea);
export const ReduxFormFirebaseUpload = reduxFormField(FirebaseUploadInput);
export const ReduxFormAddInput = reduxFormField(AddInput);
