import React, {FC} from 'react';
import style from './ProjectItem.module.css';
import {ProjectType} from "../../../types/types";

type PropsType = {
    project: ProjectType
}

const ProjectItem: FC<PropsType> = ({project}) => {
    return (
        <div className={style.item}>
            <div className={style.description}>
                <div>
                    <div>{project.type}</div>
                    <div>{project.technologies}</div>
                </div>
                <div className={style.btn}>
                    <a href={project.link}>View</a>
                </div>
                <h2>{project.name}</h2>
            </div>
            <img src={project.logo} alt={project.name}/>
        </div>
    )
};

export default ProjectItem;