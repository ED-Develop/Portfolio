import React from 'react';
import {ModalForm} from '../../common/form/modal/ModalForm';
import {url} from '../../../utils/routeManager';
import {TField} from '../../common/form/fieldsManager';
import {FORM} from '../../../constants/forms';
import {link, required} from '../../../utils/validators';

type TFormData = {
    title: string
    description: string
    link: string
    logo: string
    stack: Array<string>
}

export const ProjectsForm = () => {
    const formModel: Array<TField<TFormData>> = [
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
            type:'file',
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

    const handleSubmit = (value: TFormData) => {
        console.log(value);
    }

    return (
        <ModalForm
            title='Add new project'
            closePath={url('projects')}
            handleSubmit={handleSubmit}
            formModel={formModel}
            formName={FORM.projects}
        />
    )
};