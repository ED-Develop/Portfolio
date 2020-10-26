import React from 'react';
import {ProjectItem} from '../item/ProjectItem';
import {TProjectModel} from '../../../types/types';

type PropsType = {
    projects: Array<TProjectModel>
}

export const ProjectsList: React.FC<PropsType> = ({projects}) => {
    return (
        <>
            {
                projects.map(project => <ProjectItem key={project.id} {...project}/>)
            }
        </>
    )
}