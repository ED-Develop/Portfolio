import React from 'react';
import style from '../Projects.module.scss';
import {ProjectItem} from '../item/ProjectItem';
import {TProjectModel} from '../../../types/types';
import {Empty} from 'antd';

type PropsType = {
    projects: Array<TProjectModel>
}

export const ProjectsList: React.FC<PropsType> = ({projects}) => {
    return (
        <div className={`${style.projects__list} ${!projects.length ? style.projects__list_empty : ''}`}>
            {
                projects.length
                    ? projects.map(project => <ProjectItem key={project.id} {...project}/>)
                    : <Empty className={style.projects__empty}/>
            }
        </div>
    )
}