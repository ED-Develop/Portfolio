import React from 'react';
import style from "./search.module.css";
import {Field, reduxForm} from "redux-form";

let SearchForm = ({handleSubmit, placeholder}) => {
    return (
        <form className={style.search} onSubmit={handleSubmit}>
            <Field component={'input'} placeholder={placeholder} type="text" name='search'/>
            <button>Search</button>
        </form>
    );
};

SearchForm = reduxForm({form: 'search'})(SearchForm);

export default SearchForm;