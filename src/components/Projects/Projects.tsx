import React, {FC} from 'react';
import style from './Projects.module.css';
import ProjectItem from "./ProjectItem/ProjectItem";
import {connect} from "react-redux";
import {ProjectType} from "../../types/types";
import {AppStateType} from "../../redux/store";

type PropsType = {
    projects: Array<ProjectType>
}

const Projects: FC<PropsType> = ({projects}) => {
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
               <div className={style.projectsList}>
                   {projects.map( item => <ProjectItem project={item}/>)}
               </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projects.projects
});

export default connect(mapStateToProps, {})(Projects);
