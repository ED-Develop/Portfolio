import React from 'react';
import style from './Modal.module.scss';
import {Modal} from 'antd';

type PropsType = {
    onOk?: () => void
    onCancel?: () => void
}

export const ConfirmModal: React.FC<PropsType> = ({children, onOk, onCancel}) => {

    return (
        <Modal
            title={<p className={style.modal__header}>Are you sure?</p>}
            cancelText='No'
            okText='Yes'
            className={style.modal}
            onOk={onOk}
            onCancel={onCancel}
            visible
            centered
        >
            {children}
        </Modal>
    )
}