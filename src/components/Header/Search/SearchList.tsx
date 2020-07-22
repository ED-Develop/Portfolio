import React, {useEffect} from "react";
import style from './Search.module.css';
import {TUserModel} from "../../../types/types";
import AvatarImage from "../../common/Helpers/AvatarImage";
import {useOutsideClick} from "../../../hook/useOutsideClick";
import {NavLink} from "react-router-dom";
import {debounce} from "lodash";
import {searchItems} from "../../../redux/search/search-reducer";

type PropsType = {
    title: string
    isInputFocus: boolean
    results: Array<TUserModel>
    hideSearchList: () => void
    restoreSearchList: () => void
    cashSelectedItem: (item: TUserModel) => void
    getNewPageItems: () => void
    searchString: string
    selectItem: (item: TUserModel) => void
}

const SearchList: React.FC<PropsType> = ({title, results, isInputFocus, hideSearchList, restoreSearchList, ...props}) => {
    const ref = useOutsideClick<HTMLDivElement>(() => {
        if (!isInputFocus) {
            hideSearchList();
        }
    }, [isInputFocus]);

    useEffect(() => {
        if (props.searchString) {
            searchItems(props.searchString);
        } else {
            restoreSearchList();
        }
    }, []);

    const handleClick = (item: TUserModel) => props.selectItem(item);

    const handleScroll = debounce((e: Event) => {
        const target = e.target as HTMLDivElement;
        const scrollPosition = target.clientHeight + target.scrollTop;
        const offset = 50;

        if (scrollPosition + offset >= target.scrollHeight) {
            props.getNewPageItems();
        }
    }, 500);

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('scroll', handleScroll);
            }
        }
    }, [ref.current, props.searchString]);

    useEffect(() => {
        if (ref.current) {
            ref.current.scroll(0, 0);
        }
    }, [ref.current, props.searchString]);

    return (
        <div className={style.searchList} ref={ref}>
            <h5 className={style.search__title}>{title}</h5>
            <ul>
                {
                    results.length
                        ? results.map(result => (
                            <li key={result.id}>
                                <NavLink
                                    to={`/profile/${result.id}/timeline`}
                                    className={style.search__item}
                                    onClick={() => handleClick(result)}
                                >
                                    <div className={style.avatar}>
                                        <AvatarImage imgUrl={result.photos.small}/>
                                    </div>
                                    <div className={style.name}>
                                        {result.name}
                                    </div>
                                </NavLink>
                            </li>
                        ))
                        : <li className={style.empty}>No results</li>
                }
            </ul>
        </div>
    )
};

export default SearchList;