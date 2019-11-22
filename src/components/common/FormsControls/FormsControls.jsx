import React from 'react';
import style from './FormsControls.module.css';


export const Input = ({input, meta, ...props}) => {
    let hasError = meta.error && meta.touched;
    return (
        <div className={hasError && style.error}>
            {hasError && <div className={style.description + ' ' + style[props.castomClassName]}>{meta.error}</div>}
            <input  {...props} {...input}/>
        </div>
    )
};

export const Textarea = ({input, meta, ...props}) => {
    let hasError = meta.error;
    return (
        <div className={hasError && style.error}>
            {hasError && <div className={style.descriptionTextarea + ' ' + style[props.castomClassName]}>{meta.error}</div>}
            <textarea  {...props} {...input}/>
        </div>
    )
};