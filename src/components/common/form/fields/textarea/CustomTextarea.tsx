import React from 'react';
import style from '../../CustomFields.module.scss';
import cn from 'classnames';
import {Input} from 'antd';
import {TextAreaProps} from 'antd/lib/input/TextArea';

export const CustomTextarea: React.FC<TextAreaProps> = ({className, ...props}) => {
    return <Input.TextArea {...props} className={cn(style.field, style.field_textarea, className)}/>;
};
