import React, {FC} from 'react';
import style from './Preloader.module.css';

const Preloader: FC = () => {
    return (
        <div className={style.preloader}>
            <div className={style.indeterminate}/>
        </div>
    )
};

export default Preloader;