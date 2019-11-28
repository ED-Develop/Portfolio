import React from 'react';
import style from './FormsControls.module.css';


export const Input = ({input, meta, castomClassName, ...props}) => {
    let hasError = meta.error && meta.touched;
    return (
        <div className={hasError ? style.error : ''}>
            {hasError && <div className={style.description + ' ' + style[castomClassName]}>{meta.error}</div>}
            <input  {...props} {...input}/>
        </div>
    )
};

export const Textarea = ({input, meta,castomClassName,  ...props}) => {
    let hasError = meta.error;
    return (
        <div className={hasError ? style.error : ''}>
            {hasError && <div className={style.descriptionTextarea + ' ' + style[castomClassName]}>{meta.error}</div>}
            <textarea  {...props} {...input}/>
        </div>
    )
};