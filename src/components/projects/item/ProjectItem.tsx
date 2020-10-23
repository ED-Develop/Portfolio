import React, {FC, useState} from 'react';
import style from '../Projects.module.scss';
import {TProjectModel} from '../../../types/types';
import {Button, Col, Row} from 'antd';
import PopUpMenu from '../../common/pop-up-menu/PopUpMenu';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons/lib';
import {NavLink} from 'react-router-dom';
import {url} from '../../../utils/routeManager';
import {ConfirmModal} from '../../common/modal/ConfirmModal';
import {deleteProject} from '../../../redux/project/projects-reducer';
import {CommonThunkType} from '../../../redux/store';
import {useDispatch} from 'react-redux';

type PropsType = TProjectModel

type TAction = 'delete';

type TActionObject<V = string> = { [key in TAction]: V };

export const ProjectItem: FC<PropsType> = ({title, logo, link, description, stack, id}) => {
    const dispatch = useDispatch();
    const [actionMode, setActionMode] = useState<TAction | null>(null);

    const handleDelete = () => setActionMode('delete');

    const menuButtons = [
        <NavLink to={url('projects:update', {projectId: id})}>
            <Button type='link'><EditOutlined/>Edit</Button>
        </NavLink>,
        <Button className={style.projects__removeBtn} type='link' onClick={handleDelete}>
            <DeleteOutlined/>Delete
        </Button>,
    ]

    const getConfirmBody = (actionMode: TAction) => {
        const text: TActionObject = {
            delete: 'This project will delete!'
        };

        return text[actionMode];
    }

    const handelOk = () => {
        const actions: TActionObject<CommonThunkType<any>> = {
            delete: deleteProject(id)
        }

        if (actionMode) dispatch(actions[actionMode]);
    }

    const handleCancel = () => setActionMode(null);

    return (
        <Row className={style.projects__item}>
            <Col span={2}>
                <div className={style.projects__logo}>
                    <img src={logo} alt={`${title} logo`}/>
                </div>
            </Col>
            <Col span={22} className={style.projects__itemContent}>
                <h2 className={style.projects__name}>
                    <a target='_blank' href={link}>{title}</a>
                </h2>
                <p className={style.projects__description}>{description}</p>
                <ul className={style.projects__stack}>
                    {
                        stack.map((name, index) => (
                            <li key={index} className={style.projects__stackItem}>{name}</li>
                        ))
                    }
                </ul>
                <PopUpMenu
                    buttons={menuButtons}
                    className={style.projects__menuBtn}
                    placement='bottomRight'
                />
                {actionMode && (
                    <ConfirmModal
                        onCancel={handleCancel}
                        onOk={handelOk}
                    >
                        {getConfirmBody(actionMode)}
                    </ConfirmModal>
                )}
            </Col>
        </Row>
    )
};