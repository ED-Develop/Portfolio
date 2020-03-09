import React, {FC} from 'react';
import PreloaderSvg from '../../../assets/images/Preloader.svg';
import style from './Preloader.module.css';

const Preloader: FC = () => {
    return(
        <div className={style.preloader}>
            <img  src={PreloaderSvg}/>
        </div>
    )
};

export default Preloader;