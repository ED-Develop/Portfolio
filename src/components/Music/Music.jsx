import React from 'react';
import SearchForm from "../common/Search/Search";
import style from './Music.module.css';

const Music = () => {
    return (
        <div className={style.container}>
            <SearchForm placeholder={'Search Music'}/>
            <h1>Coming soon</h1>
        </div>
    )
};

export default Music;