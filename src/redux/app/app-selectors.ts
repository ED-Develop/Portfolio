import {TSelector} from '../../hook/useSelector';
import {AppStateType} from '../store';

export const selectProcessStatus: TSelector = state => state.app.processStatus;
export const selectIsFetching = (state: AppStateType) => state.app.isFetching;