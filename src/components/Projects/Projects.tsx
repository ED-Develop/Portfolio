import React, {FC} from 'react';
import SearchForm from "../common/Search/Search";
import style from './Projects.module.css';
import ProjectItem from "./ProjectItem/ProjectItem";
import {connect} from "react-redux";
import {ProjectType} from "../../types/types";
import {AppStateType} from "../../Redux/reduxStore";

type PropsType = {
    projects: Array<ProjectType>
}

const Projects: FC<PropsType> = ({projects}) => {
    return (
        <div className={style.container}>
            <SearchForm handleSubmit={() => alert('Search')} placeholder={'Search Projects'}/>
            <div className={style.wrapper}>
               <div className={style.projectsList}>
                   {projects.map( item => {
                       return <ProjectItem project={item}/>
                   })}
               </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        projects: state.projects.projects
    }
};

export default connect(mapStateToProps, {})(Projects);