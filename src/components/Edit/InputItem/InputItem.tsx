import React, {FC} from 'react';
import style from '../Edit.module.css';
import {Field} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";

type PropsType = {
    name: string
    label: string
    customClassName: string
    validate?: Array<(values: string) => void>
}

const InputItem: FC<PropsType> = ({name, label, customClassName, validate}) => {
    return (
        <div className={style.inputBlock}>
            <label>{label}</label>
            <Field name={name} validate={validate} customClassName={customClassName} component={Input} type='text'/>
        </div>

    )
};

export default InputItem;