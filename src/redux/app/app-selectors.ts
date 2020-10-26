import {TSelector} from '../../hook/useSelector';
import {AppStateType} from '../store';

export const selectProcessStatus: TSelector = state => state.app.processStatus;
export const selectIsFetching = (state: AppStateType) => state.app.isFetching;
export const selectInitialized = (state: AppStateType) => state.app.initialized;
export const selectGlobalError = (state: AppStateType) => state.app.globalError;