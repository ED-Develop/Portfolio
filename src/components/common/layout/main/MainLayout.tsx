import React from 'react';
import style from './MainLayout.module.scss';
import {Empty} from 'antd';

type PropsType = {
    className?: string
    title?: string
    isEmpty?: boolean
}

export const MainLayout: React.FC<PropsType> = ({children, className, title, isEmpty}) => {
    return (
        <div className={`${style.main} ${className}`}>
            {title && <h1 className={style.main__title}>{title}</h1>}
            <div className={style.main__content}>
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