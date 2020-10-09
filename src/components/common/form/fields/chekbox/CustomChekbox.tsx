import React from 'react';
import {Checkbox} from 'antd';
import {WrappedFieldInputProps} from 'redux-form/lib/Field';

type PropsType = {
    value: boolean
}

export const CustomCheckbox: React.FC<PropsType & WrappedFieldInputProps> = ({value, ...props}) => {
    return (
        <Checkbox checked={value} {...props}/>
    )
};