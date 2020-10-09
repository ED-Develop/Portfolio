import {useSelector as useSelectorRedux} from 'react-redux';
import {AppStateType} from '../redux/store';

export const useSelector = <TData>(selector: (state: AppStateType) => TData) => {
    return useSelectorRedux<AppStateType, TData>(selector);
}