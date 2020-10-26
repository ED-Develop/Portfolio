import {useSelector as useSelectorRedux} from 'react-redux';
import {AppStateType} from '../redux/store';

export type TSelector<D = any> = (state: AppStateType) => D

export const useSelector = <TData>(selector: TSelector<TData>) => {
    return useSelectorRedux<AppStateType, TData>(selector);
}