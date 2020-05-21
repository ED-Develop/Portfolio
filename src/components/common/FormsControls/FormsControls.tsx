import React, {ComponentType, FC} from 'react';
import style from './FormsControls.module.css';
import {Field, WrappedFieldProps} from "redux-form";
import {ValidatorsType} from "../../../utils/validators";

export type CustomFieldPropsType = {
    customClassName: string
}

export const Input: FC<CustomFieldPropsType & WrappedFieldProps> = ({
                                                             input,
                                                             meta,
                                                             customClassName,
                                                             ...props
                                                         }) => {
    let hasError = meta.error && meta.touched;

    return (
        <div className={hasError ? style.error : ''}>
            {hasError && <div className={style.description + ' ' + style[customClassName]}>{meta.error}</div>}
            <input  {...props} {...input}/>
        </div>
    )
};

export const Textarea: FC<CustomFieldPropsType & WrappedFieldProps> = ({
                                                                input,
                                                                meta,
                                                                customClassName,
                                                                ...props
                                                            }) => {
    let hasError = meta.error && meta.touched;
    return (
        <div className={hasError ? style.error : ''}>
            {hasError && <div className={style.descriptionTextarea + ' ' + style[customClassName]}>{meta.error}</div>}
            <textarea  {...props} {...input}/>
        </div>
    )
};

export type CreateFieldOptionsType<ForkKeysType> = {
    component: ComponentType<CustomFieldPropsType & WrappedFieldProps> | string,
    name: ForkKeysType,
    validators?: Array<ValidatorsType>,
    type?: string,
    placeholder?: string,
    customClassName?: string,
    label?: string,
    labelAppend?: boolean,
    labelContainer?: boolean
}

export function createField<N extends string>(options: CreateFieldOptionsType<N>) {
    const {
        component,
        name,
        validators,
        type = 'text',
        placeholder,
        customClassName = 'left',
        label,
        labelAppend,
        labelContainer
    } = options;

    const field = (
        <Field
            validate={validators}
            customClassName={customClassName}
            component={component}
            name={name}
            placeholder={placeholder}
            type={type}
        />
    );

    if (labelContainer) {
        return (
            <label>
                {field}
                {label && label}
            </label>
        )
    }

    return (
        <>
            {label && !labelAppend && <label>{label}</label>}
            {field}
            {label && labelAppend && <label>{label}</label>}
        </>
    )
}

export type GetObjectsKeys<O> = Extract<keyof O, string>;
