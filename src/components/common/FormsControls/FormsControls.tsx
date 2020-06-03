import React, {ComponentType, FC, MutableRefObject, useEffect, useRef} from 'react';
import style from './FormsControls.module.css';
import {Field, WrappedFieldProps} from "redux-form";
import {ValidatorsType} from "../../../utils/validators";
import {Input} from 'antd';
import TextArea from "antd/lib/input/TextArea";

export type CustomFieldPropsType = {
    customClassName: string
    className?: string
    isFocus?: boolean
    toggleIsFocus?: (isFocus?: boolean) => void
}

export const CustomInput: FC<CustomFieldPropsType & WrappedFieldProps> = ({
                                                                              input,
                                                                              meta,
                                                                              customClassName,
                                                                              ...props
                                                                          }) => {
    let hasError = meta.error && meta.touched;

    return (
        <div className={`${hasError ? style.error : ''} `}>
            {hasError && <div className={style.description + ' ' + style[customClassName]}>{meta.error}</div>}
            <Input  {...props} {...input}/>
        </div>
    )
};

export const Textarea: FC<CustomFieldPropsType & WrappedFieldProps> = ({
                                                                           input,
                                                                           meta,
                                                                           customClassName,
                                                                           className,
                                                                           isFocus,
                                                                           toggleIsFocus,
                                                                           ...props
                                                                       }) => {
    const hasError = meta.error && meta.touched;
    const textAreaElement = useRef<TextArea>(null);

    useEffect(() => {
        if (textAreaElement.current && isFocus) {
            textAreaElement.current.focus();
        }
    }, [isFocus, textAreaElement]);

    const handleBlur = () => {
        if (toggleIsFocus) {
            toggleIsFocus(false);
        }
    };

    return (
        <div className={`${style.customTextarea} ${hasError ? style.error : ''} ${className}`}>
            {hasError && <div className={style.descriptionTextarea + ' ' + style[customClassName]}>{meta.error}</div>}
            <Input.TextArea
                {...props} {...input}
                ref={textAreaElement}
                onBlur={handleBlur}
            />
        </div>
    )
};

export type CreateFieldOptionsType<ForkKeysType, P = {}, RE extends HTMLElement | null = null> = {
    component: ComponentType<CustomFieldPropsType & WrappedFieldProps & P> | string,
    name: ForkKeysType,
    validators?: Array<ValidatorsType>,
    type?: string,
    placeholder?: string,
    customClassName?: string,
    label?: string,
    labelAppend?: boolean,
    labelContainer?: boolean
    props?: P
    ref?: (element: MutableRefObject<RE>) => void
}

export function createField<N extends string, P extends { [key: string]: any } = {}>(options: CreateFieldOptionsType<N, P>) {
    const {
        component,
        name,
        validators,
        type = 'text',
        placeholder,
        customClassName = 'left',
        label,
        labelAppend,
        labelContainer,
        props
    } = options;

    const field = (
        <Field
            validate={validators}
            customClassName={customClassName}
            component={component}
            name={name}
            placeholder={placeholder}
            type={type}
            {...props}
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
