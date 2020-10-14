import {ProcessStatusEnum} from '../types/types';
import {useEffect, useState} from 'react';
import {message} from 'antd';
import {useDispatch} from 'react-redux';
import {appActions} from '../redux/app/app-reducer';

type TMessage = {
    success?: string
    loading?: string
    error?: string
}

export const useMessage = (messages: TMessage, status?: ProcessStatusEnum | null) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        if (status === ProcessStatusEnum.Success || status === ProcessStatusEnum.Error) {
            dispatch(appActions.changeProcessStatus(null));
        }
    };

    useEffect(() => {
        if (status) {
            if (isOpen) {
                message.destroy();
                setIsOpen(false);
            }

            message[status](messages[status], onClose);
            setIsOpen(true);
        }
    }, [status]);
}