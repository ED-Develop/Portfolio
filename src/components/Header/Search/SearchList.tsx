import React from "react";
import style from './Search.module.css';
import {TUserModel} from "../../../types/types";
import AvatarImage from "../../common/Helpers/AvatarImage";

type PropsType = {
    title: string
    results: Array<TUserModel>
}

const SearchList: React.FC<PropsType> = ({title, results}) => {
    return (
        <div className={style.searchList}>
            <h5 className={style.search__title}>{title}</h5>
            <ul>
                {
                    results.length
                        ? results.map(result => (
                            <li key={result.id} className={style.search__item}>
                                <div className={style.avatar}>
                                    <AvatarImage imgUrl={result.photos.small}/>
                                </div>
                                <div className={style.name}>
                                    {result.name}
                                </div>
                            </li>
                        ))
                        : <li className={style.empty}>No results</li>
                }
            </ul>
        </div>
    )
};

export default SearchList;