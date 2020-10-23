import {useSelector} from './useSelector';
import {selectProcessStatus} from '../redux/app/app-selectors';
import {useEffect} from 'react';
import {appActions} from '../redux/app/app-reducer';
import {useDispatch} from 'react-redux';
import {ProcessStatusEnum} from '../types/types';

export const useProcessStatus = (callback: () => void, status: ProcessStatusEnum = ProcessStatusEnum.Success) => {
    const dispatch = useDispatch();
    const processStatus = useSelector(selectProcessStatus);

    useEffect(() => {
        return () => {
            dispatch(appActions.changeProcessStatus(null));
        }
    }, []);

    useEffect(() => {
        if (processStatus === status) callback();
    }, [processStatus]);
};