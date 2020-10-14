import React from 'react';
import style from '../../CustomFields.module.scss';
import {Input} from 'antd';
import {TextAreaProps} from 'antd/lib/input/TextArea';

export const CustomTextarea: React.FC<TextAreaProps> = (props) => {
    return <Input.TextArea {...props} className={`${style.field} ${style.field_textarea}`}/>
};