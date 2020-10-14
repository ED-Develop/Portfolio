import {stopSubmit} from 'redux-form';
import {Dispatch} from 'redux';
import {AppStateType} from './store';

export const validateForm = (condition: () => boolean, formName: string, dispatch: Dispatch) => {
    if (condition()) {
        return true;
    } else {
        dispatch(stopSubmit(formName, {_error: `Empty ${formName} form`}));
        return false;
    }
};


export const getOwnerId = (getState: () => AppStateType) => {
    const id = getState().auth.userId;

    if (!id) throw new Error('No owner id');

    return id;
}