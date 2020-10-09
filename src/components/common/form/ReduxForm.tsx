import React, {useEffect, useState} from 'react';
import {reduxForm} from 'redux-form';

type TContext = {
    error?: Array<string>
}

type PropsType = {
    className?: string
    children: (context: TContext) => React.ReactNode
}

export const ReduxForm = reduxForm<any, PropsType, Array<string>>({})
(({children, handleSubmit, className, error}) => {
    const [formError, setFormError] = useState<Array<string>>();

    useEffect(() => {
        if (error) setFormError(error);
    }, [error]);

    return (
        <form onSubmit={handleSubmit} className={className}>
            {children({error: formError})}
        </form>
    )
});