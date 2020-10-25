import React from 'react';
import style from './MainLayout.module.scss';
import {Empty} from 'antd';

type PropsType = {
    className?: string
    contentClassName?: string
    title?: string
    isEmpty?: boolean
}

export const MainLayout: React.FC<PropsType> = ({children, className, title, isEmpty, contentClassName}) => {
    return (
        <div className={`${style.main} ${className}`}>
            {title && <h1 className={style.main__title}>{title}</h1>}
            <div className={`${style.main__content} ${contentClassName}`}>
                {children}
                {isEmpty && (
                    <div className={style.main__empty}>
                        <Empty/>
                    </div>
                )}
            </div>
        </div>
    )
};