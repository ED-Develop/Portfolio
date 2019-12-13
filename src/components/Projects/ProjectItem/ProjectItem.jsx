import React from 'react';
import style from './ProjectItem.module.css';

const ProjectItem = ({name, type, technologies, logo, link}) => {
    return (
        <div className={style.item}>
            <div className={style.description}>
                <div>
                    <div>{type}</div>
                    <div>{technologies}</div>
                </div>
                <div className={style.btn}>
                    <a href={link}>View</a>
                </div>
                <h2>{name}</h2>
            </div>
            <img src={logo} alt={name}/>
        </div>
    )
};

export default ProjectItem;