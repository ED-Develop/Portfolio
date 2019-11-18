import {auth} from "./authReducer";

const INITIALIZED_SUCCESS = 'portfolio/app/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

const intialezedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    }
};

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(auth());

    Promise.all([promise]).then( () => {
        dispatch(intialezedSuccess());
    })
};

export default appReducer;