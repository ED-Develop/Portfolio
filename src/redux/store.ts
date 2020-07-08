import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./porfile/profile-reducer";
import dialogReducer from "./dialog-reducer";
import asideReducer from "./aside-reducer";
import usersReducer from "./users/users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";
import projectsReducer from "./projects-reducer";
import timelineReducer from "./timeline/timeline-reducer";
import searchReducer from "./search/search-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogReducer,
    aside: asideReducer,
    people: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    projects: projectsReducer,
    timeline: timelineReducer,
    search: searchReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends {[keys: string] : (...args: any[]) => infer U } ? U : never;
export type CommonThunkType<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.store = store;

export default store;
