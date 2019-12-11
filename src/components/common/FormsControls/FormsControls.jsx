import React from 'react';
import style from './FormsControls.module.css';


export const Input = ({input, meta, customClassName, ...props}) => {
    let hasError = meta.error && meta.touched;
    return (
        <div className={hasError ? style.error : ''}>
            {hasError && <div className={style.description + ' ' + style[customClassName]}>{meta.error}</div>}
            <input  {...props} {...input}/>
        </div>
    )
};

export const Textarea = ({input, meta, customClassName,  ...props}) => {
    let hasError = meta.error && meta.touched;
    return (
        <div className={hasError ? style.error : ''}>
            {hasError && <div className={style.descriptionTextarea + ' ' + style[customClassName]}>{meta.error}</div>}
            <textarea  {...props} {...input}/>
        </div>
    )
};