import React from 'react';
import {reduxForm} from 'redux-form';

type PropsType = {
    className?: string
}

export const ReduxForm = reduxForm<any, PropsType>({})(({children, handleSubmit, className, error}) => {
    console.log(error)
    return (
        <form onSubmit={handleSubmit} className={className}>
            {children}
        </form>
    )
});