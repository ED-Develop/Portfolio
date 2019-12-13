import React from 'react';
import SearchForm from "../common/Search/Search";
import style from './Projects.module.css';
import ProjectItem from "./ProjectItem/ProjectItem";
import {connect} from "react-redux";

const Projects = ({projects}) => {
    return (
        <div className={style.container}>
            <SearchForm placeholder={'Search Projects'}/>
            <div className={style.wrapper}>
               <div className={style.projectsList}>
                   {projects.map( item => {
                       return <ProjectItem type={item.type} name={item.name} logo={item.logo}
                                           technologies={item.technologies} link={item.link}/>
                   })}
               </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        projects: state.projects.projects
    }
};

export default connect(mapStateToProps, {})(Projects);