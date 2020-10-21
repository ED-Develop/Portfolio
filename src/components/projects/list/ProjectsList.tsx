import React from 'react';
import {ProjectItem} from '../item/ProjectItem';
import {ProjectType} from '../../../types/types';

type PropsType = {
    projects: Array<ProjectType>
}

export const ProjectsList: React.FC<PropsType> = ({projects}) => {
    return (
        <>
            {
                projects.map(project => <ProjectItem {...project}/>)
            }
        </>
    )
}