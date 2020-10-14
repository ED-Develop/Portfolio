import React, {FC, useState} from 'react';
import style from './Search.module.css';
import SearchForm, {TSearchFormData} from "./SearchForm";
import SearchList from "./SearchList";
import {TUserModel} from "../../../types/types";
import {debounce} from 'lodash';
import Fade from "../../common/animations/Fade";

type PropsType = {
    searchResults: Array<TUserModel>
    isSearchFetching: boolean
    searchString: string
    searchItems: (string: string, next?: boolean) => void
    restoreSearchList: () => void
    cashSelectedItem: (item: TUserModel) => void
    setSearchString: (string: string) => void
    reset: (formName: string) => void
}

const FORM_NAME = 'search';

const Search: FC<PropsType> = ({searchItems, searchResults, restoreSearchList, cashSelectedItem, isSearchFetching, ...props}) => {
    const [isSearchList, setIsSearchList] = useState(false);
    const [isInputFocus, setIsInputFocus] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(true);

    const search = (formData: TSearchFormData) => {
        if (!formData.search) {
            restoreSearchList();
            setIsInputEmpty(true);
        } else {
            setIsInputEmpty(false);
            searchItems(formData.search);
        }
    };

    const getNewPageItems = () => {
        if (props.searchString) {
            searchItems(props.searchString, true);
        }
    }

    const selectItem = (item: TUserModel) => {
        cashSelectedItem(item);
        hideSearchList();
        props.setSearchString('');
        props.reset(FORM_NAME);
    }

    const onChange = debounce(search, 500);

    const showSearchList = () => {
        setIsSearchList(true);
        setIsInputFocus(true);
    };

    const handleBlur = () => setIsInputFocus(false);
    const hideSearchList = () => setIsSearchList(false);

    return (
        <div className={style.searchWrapper}>
            <SearchForm
                placeholder='Search for Friends, Videos and more'
                onChange={onChange}
                showSearchList={showSearchList}
                handleBlur={handleBlur}
                isSearchFetching={isSearchFetching}
                form={FORM_NAME}
            />
            <Fade inProp={isSearchList} duration={200}>
                <SearchList
                    title={isInputEmpty ? 'Recent Searches' : 'Search results'}
                    results={searchResults}
                    isInputFocus={isInputFocus}
                    hideSearchList={hideSearchList}
                    restoreSearchList={restoreSearchList}
                    cashSelectedItem={cashSelectedItem}
                    getNewPageItems={getNewPageItems}
                    searchString={props.searchString}
                    selectItem={selectItem}
                />
            </Fade>
        </div>
    );
};

export default Search;
