import React, {FC} from 'react';
import style from "./Search.module.css";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, CustomInput, GetObjectsKeys} from "../FormsControls/FormsControls";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons/lib";

type PropsType = {
    placeholder: string
}

type FormDataType = {
    search: string
}

type SearchFormDataKeysType = GetObjectsKeys<FormDataType>

const SearchForm: FC<PropsType & InjectedFormProps<FormDataType, PropsType>> = ({handleSubmit, placeholder}) => {
    return (
        <form className={style.search} onSubmit={handleSubmit}>
            {createField<SearchFormDataKeysType>({
                placeholder,
                name: 'search',
                component: CustomInput,
                props: {
                    size: "large",
                    prefix: <SearchOutlined/>,
                    className: style.searchInput
                }
            })}
        </form>
    );
};

const ReduxSearchForm = reduxForm<FormDataType, PropsType>({form: 'search'})(SearchForm);

export default ReduxSearchForm;
