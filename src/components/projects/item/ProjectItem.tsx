import React, {FC} from 'react';
import style from '../Projects.module.scss';
import {ProjectType} from '../../../types/types';
import {Col, Row} from 'antd';

type PropsType = ProjectType

export const ProjectItem: FC<PropsType> = ({title, logo, link, description, stack}) => {
    return (
        <Row className={style.projects__item}>
            <Col span={2}>
                <div className={style.projects__logo}>
                    <img src={logo} alt={`${title} logo`}/>
                </div>
            </Col>
            <Col span={22}>
                <h2 className={style.projects__name}>
                    <a href={link}>{title}</a>
                </h2>
                <p className={style.projects__description}>{description}</p>
                <ul className={style.projects__stack}>
                    {
                        stack.map(name => (
                            <li key={title} className={style.projects__stackItem}>{name}</li>
                        ))
                    }
                </ul>
            </Col>
        </Row>
    )
};