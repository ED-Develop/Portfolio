import React from 'react';
import style from './ModalWindow.module.css';

const ModalWindow = ({modalTitle, children,footerDescription, hideModalWindow}) => {
    const onModalClose = () => {
        hideModalWindow();
    };

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalWindow}>
                <div className={style.modalHeader}>
                    {modalTitle}
                    <div onClick={onModalClose} className={style.closeBtn}>&times;</div>
                </div>
                <div className={style.modalBody}>
                    {children}
                </div>
                <div className={style.modalFooter}>
                    {footerDescription}
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;