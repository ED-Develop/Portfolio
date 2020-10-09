import {Dispatch} from "redux";
import {appActions} from "./app/app-reducer";
import {ResultCodesEnum} from "../api/api";

type TCommonThunkHandler = (
    callback: () => Promise<any>,
    dispatch: Dispatch,
    isResultCode?: boolean,
    withoutVisualization?: boolean
) => void;
type TThunkHandler = (callback: () => Promise<any>, dispatch: Dispatch) => () => Promise<any>;

const withProcessVisualization: TThunkHandler = (callback, dispatch) => async () => {
    dispatch(appActions.toggleIsFetching(true));
    const data = await callback();
    dispatch(appActions.toggleIsFetching(false));

    return data;
};

const withTryCatch: TThunkHandler = (callback, dispatch) => async () => {
    try {
        return await callback();
    } catch (e) {
        dispatch(appActions.setGlobalError(e));
    }
};

const withResultCodeHandling: TThunkHandler = (callback) => async () => {
    const data = await callback();

    if (data.resultCode && data.resultCode === ResultCodesEnum.Error) {
        console.log(data);
    }

    return data;
}

export const commonThunkHandler: TCommonThunkHandler = async (callback, dispatch, isResultCode, withoutVisualization) => {
    let withFetching;

    if (withoutVisualization) {
        return await withTryCatch(callback, dispatch)();
    } else {
        if (isResultCode) {
            const withResultCode = withResultCodeHandling(callback, dispatch);

            withFetching = withProcessVisualization(withResultCode, dispatch);
        } else {
            withFetching = withProcessVisualization(callback, dispatch);
        }

        return await withTryCatch(withFetching, dispatch)();
    }
}