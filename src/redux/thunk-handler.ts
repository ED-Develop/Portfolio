import {Dispatch} from 'redux';
import {appActions} from './app/app-reducer';
import {ResultCodesEnum} from '../api/api';
import {ProcessStatusEnum} from '../types/types';

type TCommonThunkHandler = (
    callback: () => Promise<any>,
    dispatch: Dispatch,
    options?: TOptions
) => void;
type TThunkHandler = (callback: () => Promise<any>, dispatch: Dispatch) => () => Promise<any>;

type TOptions = {
    resultCode?: boolean
    visualization?: boolean
    status?: boolean
}

const withProcessVisualization: TThunkHandler = (callback, dispatch) => async () => {
    dispatch(appActions.toggleIsFetching(true));
    const data = await callback();
    dispatch(appActions.toggleIsFetching(false));

    return data;
};

export const withTryCatch: TThunkHandler = (callback, dispatch) => async () => {
    try {
        return await callback();
    } catch (e) {
        console.log(e);
        dispatch(appActions.setGlobalError(e));
    }
};

const withResultCodeHandling: TThunkHandler = (callback) => async () => {
    const data = await callback();

    if (data?.resultCode === ResultCodesEnum.Error) {
        console.log(data);
    }

    return data;
};

const withProcessStatus: TThunkHandler = (callback, dispatch) => async () => {
    dispatch(appActions.changeProcessStatus(ProcessStatusEnum.Pending));
    const data = await callback();
    dispatch(appActions.changeProcessStatus(ProcessStatusEnum.Success));

    return data;
}

const defaultOptions = {
    resultCode: true,
    visualization: true,
    status: false
}

export const commonThunkHandler: TCommonThunkHandler = async (callback, dispatch, options) => {
    const {resultCode, visualization, status} = {...defaultOptions, ...options};
    let tryCatchBody = callback;

    if (status) {
        if (visualization) {
            let withFetching;

            if (resultCode) {
                const withResultCode = withResultCodeHandling(callback, dispatch);

                withFetching = withProcessVisualization(withResultCode, dispatch);
            } else {
                withFetching = withProcessVisualization(callback, dispatch);
            }

            tryCatchBody = withProcessStatus(withFetching, dispatch);

        } else {
            tryCatchBody = withProcessStatus(callback, dispatch);
        }

        return await withTryCatch(tryCatchBody, dispatch)();
    } else {
        if (visualization) {
            if (resultCode) {
                const withResultCode = withResultCodeHandling(callback, dispatch);

                tryCatchBody = withProcessVisualization(withResultCode, dispatch);
            } else {
                tryCatchBody = withProcessVisualization(callback, dispatch);
            }
        }
    }

    return await withTryCatch(tryCatchBody, dispatch)();
}
