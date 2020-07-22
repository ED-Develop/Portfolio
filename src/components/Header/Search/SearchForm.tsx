import React, {FC} from "react";
import style from "./Search.module.css";
import {createField, CustomInput, GetObjectsKeys} from "../../common/FormsControls/FormsControls";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons/lib";
import {InjectedFormProps, reduxForm} from "redux-form";

type PropsType = {
    placeholder: string
    isSearchFetching: boolean
    showSearchList: () => void
    handleBlur: () => void
}

export type TSearchFormData = {
    search: string
}

type SearchFormDataKeysType = GetObjectsKeys<TSearchFormData>

const SearchForm: FC<PropsType & InjectedFormProps<TSearchFormData, PropsType>> = ({handleSubmit, placeholder, ...props}) => {
    return (
        <div>
            <form className={style.search} onSubmit={handleSubmit}>
                {createField<SearchFormDataKeysType>({
                    placeholder,
                    name: 'search',
                    component: CustomInput,
                    props: {
                        size: "large",
                        prefix: props.isSearchFetching ? <LoadingOutlined/> : <SearchOutlined/>,
                        className: style.searchInput,
                        onFocus: props.showSearchList,
                        onBlur: props.handleBlur,
                        autoComplete: 'off',
                    }
                })}
            </form>
        </div>
    )
}

export default reduxForm<TSearchFormData, PropsType>({})(SearchForm);