import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";

export const validateForm = (condition: () => boolean, formName: string, dispatch: Dispatch) => {
    if (condition()) {
        return true;
    } else {
        dispatch(stopSubmit(formName, {_error: `Empty ${formName} form`}));
        return false;
    }
};
