import React, {useEffect, useState} from 'react'
import style from './AddInput.module.scss';
import {CustomInput} from '../input/CustomInput';
import {WrappedFieldInputProps} from 'redux-form';
import {PlusOutlined} from '@ant-design/icons/lib';
import {Tag} from 'antd';

type PropsType = WrappedFieldInputProps & {
    placeholder?: string
    value: Array<string>
}

export const AddInput: React.FC<PropsType> = ({placeholder, value, onChange}) => {
    const [inputValue, setInputValue] = useState('');
    const [values, setValues] = useState<Array<string>>([]);

    useEffect(() => {
        if (value) setValues(value);
    }, []);

    useEffect(() => {
        onChange(values);
    }, [values]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    const handleClose = (value: string) => {
        setValues(values => values.filter(v => v !== value));
    }

    const addValue = () => {
        if (inputValue) {
            setValues(values => [...values, inputValue]);
            setInputValue('');
        }
    }

    return (
        <div className={style.add}>
            <CustomInput
                className={style.add__input}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
                suffix={<PlusOutlined className={style.add__btn} onClick={addValue}/>}
            />
            <ul className={style.add__list}>
                {
                    values.map(value => (
                        <li key={value}>
                            <Tag
                                className={style.add__listItem}
                                onClose={handleClose.bind(null, value)}
                                closable
                            >
                                {value}
                            </Tag>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}