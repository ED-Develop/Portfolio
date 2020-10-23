import React, {useEffect, useMemo, useState} from 'react';
import {ModalForm} from '../../common/form/modal/ModalForm';
import {url} from '../../../utils/routeManager';
import {TField} from '../../common/form/fieldsManager';
import {FORM} from '../../../constants/forms';
import {link, required} from '../../../utils/validators';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addProject, editProject} from '../../../redux/project/projects-reducer';
import {useProcessStatus} from '../../../hook/useProcessStatus';
import {useSelector} from '../../../hook/useSelector';
import {selectProjectById} from '../../../redux/project/projects-selectors';

export type TProjectFormData = {
    title: string
    description: string
    link: string
    logo: string
    stack: Array<string>
}

type TParams = {
    projectId: string
}

type TMode = 'create' | 'update';

export const ProjectsForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {projectId} = useParams<TParams>();
    const [mode, setMode] = useState<TMode>('create');
    const project = useSelector(selectProjectById(projectId || ''));

    useEffect(() => {
        if (projectId) setMode('update');
    }, []);

    useProcessStatus(() => history.push(url('projects')));

    const formModel: Array<TField<TProjectFormData>> = [
        {
            name: 'title',
            type: 'text',
            label: 'Name',
            placeholder: 'Project Name',
            validate: [required]
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            placeholder: 'Project Description'
        },
        {
            name: 'link',
            type: 'text',
            label: 'Link',
            placeholder: 'Link for Project',
            validate: [link]
        },
        {
            name: 'logo',
            type: 'file',
            label: 'Project Logo',
            storage: 'projects'
        },
        {
            name: 'stack',
            type: 'add',
            label: 'Stack of Technologies',
            placeholder: 'Project Technology'
        }
    ];

    const handleSubmit = (value: TProjectFormData) => {
        const action = mode === 'update' ? editProject(value, projectId) : addProject(value);

        dispatch(action);
    }

    const getTitle = () => mode === 'create' ? 'Add new project' : 'Edit project';

    const initialValues = useMemo(() => {
        if (project) {
            const {id, ...restProject} = project;

            return restProject;
        }

        return void 0;
    }, [project]);

    return (
        <ModalForm
            title={getTitle()}
            closePath={url('projects')}
            handleSubmit={handleSubmit}
            formModel={formModel}
            formName={FORM.projects}
            initialValues={initialValues}
        />
    )
};