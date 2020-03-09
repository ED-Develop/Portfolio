import React, {FC} from 'react';
import style from "./search.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type PropsType = {
    placeholder: string
}

type FormDataType = {
    search: string
}

let SearchForm: FC<any & InjectedFormProps<FormDataType, PropsType>> = ({handleSubmit, placeholder}) => {
    return (
        <form className={style.search} onSubmit={handleSubmit}>
            <Field component={'input'} placeholder={placeholder} type="text" name='search'/>
            <button>Search</button>
        </form>
    );
};

let ReduxSearchForm = reduxForm<FormDataType, PropsType>({form: 'search'})(SearchForm);

export default ReduxSearchForm;