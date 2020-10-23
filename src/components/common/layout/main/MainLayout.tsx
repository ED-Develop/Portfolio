import React from 'react';
import style from './MainLayout.module.scss';

type PropsType = {
    className?: string
    title?: string
}

export const MainLayout: React.FC<PropsType> = ({children, className, title}) => {
    return (
        <div className={`${style.main} ${className}`}>
            {title && <h1 className={style.main__title}>{title}</h1>}
            <div className={style.main__content}>
                {children}
            </div>
        </div>
    )
};