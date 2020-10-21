import React from 'react';
import style from '../Projects.module.scss';
import {NavLink} from 'react-router-dom';
import {url} from '../../../utils/routeManager';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons/lib';

export const AddProject = () => {
    return (
        <div className={style.projects__add}>
            <NavLink to={url('projects:add')}>
                <Button type='primary'><PlusOutlined/> Add Project</Button>
            </NavLink>
        </div>
    )
};