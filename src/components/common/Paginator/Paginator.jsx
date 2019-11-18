import React, {useState, useEffect} from 'react';
import style from "./Paginator.module.css";
import {calcStartPage} from "../../../utils/paginator";

const Paginator = ({onSetCurrentPage, currentPage, totalCount, count, portionSize}) => {
    let [startPage, setStartPage] = useState(1);
    let totalPages = Math.ceil(totalCount / count);

    useEffect(() => {
        setStartPage(calcStartPage(startPage, totalPages, portionSize, currentPage));
    }, [currentPage]);

    let i = startPage;
    let j = i + portionSize;
    let pages = ['<<'];

    for (i; i <= j; i++) {
        pages.push(i);
    }
    pages.push('>>');

    return (
        <div className={style.pagination}>
            {pages.map((p) => {
                if (p == '<<') {
                    return <span onClick={() => onSetCurrentPage(1)}>{p}</span>
                } else if (p == '>>') {
                    return <span onClick={() => onSetCurrentPage(totalPages)}>{p}</span>
                } else {
                    return <span onClick={() => onSetCurrentPage(p)}
                                 className={currentPage == p && style.active}>{p}</span>
                }

            })}
        </div>
    )
};
export default Paginator;