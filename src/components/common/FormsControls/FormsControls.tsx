import React, {FC} from 'react';
import style from './FormsControls.module.css';
import {Field, WrappedFieldProps} from "redux-form";
import {required, ValidatorsType} from "../../../utils/validators";

type PropsType = {
    customClassName: string
}

export const Input: FC<PropsType & WrappedFieldProps> = ({
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

export const Textarea: FC<PropsType & WrappedFieldProps> = ({
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


export function createField<ForkKeysType extends string>(component: FC<PropsType & WrappedFieldProps> | string,
                                                         name: ForkKeysType,
                                                         validators?: Array<ValidatorsType>,
                                                         type?: string,
                                                         placeholder?: string,
                                                         customClassName?: string) {
    return (
        <Field validate={validators} customClassName={customClassName} component={component} name={name}
               placeholder={placeholder} type={type}/>
    )
}