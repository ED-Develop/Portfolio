import React, {FC, useState} from 'react';
import style from './Search.module.css';
import SearchForm, {TSearchFormData} from "./SearchForm";
import SearchList from "./SearchList";
import {TUserModel} from "../../../types/types";
import {debounce} from 'lodash';

type PropsType = {
    searchResults: Array<TUserModel>
    searchItems: (string: string) => void
}

const Search: FC<PropsType> = ({searchItems, searchResults}) => {
    const [isSearchList, setIsSearchList] = useState(false);
    const search = (formData: TSearchFormData) => searchItems(formData.search);
    const onChange = debounce(search, 500);

    const showSearchList = () => setIsSearchList(true);
    const hideSearchList = () => setIsSearchList(false);

    return (
        <div className={style.searchWrapper}>
            <SearchForm
                placeholder='Search for Friends, Videos and more'
                onChange={onChange}
                showSearchList={showSearchList}
                hideSearchList={hideSearchList}
            />
            {isSearchList && <SearchList title='Recent Searches' results={searchResults}/>}
        </div>
    );
};

export default Search;
