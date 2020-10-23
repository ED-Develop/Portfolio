import React, {useEffect} from 'react';
import style from './Projects.module.scss';
import {Col, Row} from 'antd';
import {ProjectsList} from './list/ProjectsList';
import {useSelector} from '../../hook/useSelector';
import {AddProject} from './add/AddProject';
import {ProjectRoutes} from './routes/ProjectRoutes';
import {useDispatch} from 'react-redux';
import {getProjects} from '../../redux/project/projects-reducer';
import {selectProjects} from '../../redux/project/projects-selectors';

const Projects: React.FC = () => {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    return (
        <div className={style.projects}>
            <h1 className={style.projects__title}>Projects</h1>
            <Row>
                <Col span={16}>
                    <ProjectsList projects={projects}/>
                </Col>
                <Col span={8}>
                    <AddProject/>
                </Col>
            </Row>
            <ProjectRoutes/>
        </div>
    )
};

export default Projects;
