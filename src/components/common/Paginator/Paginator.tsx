import React, {useState, useEffect, FC} from 'react';
import style from "./Paginator.module.css";
import {calcStartPage} from "../../../utils/paginator";

type PropsType = {
    onSetCurrentPage: (currentPage: number) => void
    currentPage: number
    totalCount: number
    count: number
    portionSize: number
}

const Paginator:FC<PropsType> = ({onSetCurrentPage, currentPage, totalCount,
                                     count, portionSize}) => {
    let [startPage, setStartPage] = useState(1);
    let totalPages = Math.ceil(totalCount / count);

    useEffect(() => {
        setStartPage(calcStartPage(startPage, totalPages, portionSize, currentPage));
    }, [currentPage]);

    let i = startPage;
    let j = i + portionSize;
    let pages: Array<string | number> = ['<<'];

    for (i; i <= j; i++) {
        pages.push(i);
    }
    pages.push('>>');

    return (
        <div className={style.pagination}>
            {pages.map((p) => {
                if (p == '<<') {
                    return <span key={p} onClick={() => onSetCurrentPage(1)}>{p}</span>
                } else if (p == '>>') {
                    return <span key={p} onClick={() => onSetCurrentPage(totalPages)}>{p}</span>
                } else if (typeof p === 'number') {
                    return <span key={p} onClick={() => onSetCurrentPage(p)}
                                 className={currentPage == p ? style.active : ""}>{p}</span>
                }

            })}
        </div>
    )
};
export default Paginator;