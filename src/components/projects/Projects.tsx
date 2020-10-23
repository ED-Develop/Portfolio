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
import {MainLayout} from '../common/layout/main/MainLayout';
import {selectIsFetching} from '../../redux/app/app-selectors';

const Projects: React.FC = () => {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);
    const isFetching = useSelector(selectIsFetching);

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    if (isFetching) return null;

    return (
        <MainLayout
            isEmpty={!projects.length}
            className={style.projects}
            title='Projects'
        >
            <Row>
                <Col span={16}>
                    <ProjectsList projects={projects}/>
                </Col>
                <Col span={8}>
                    <AddProject/>
                </Col>
            </Row>
            <ProjectRoutes/>
        </MainLayout>
    )
};

export default Projects;
