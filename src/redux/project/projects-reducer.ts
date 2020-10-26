import {TProjectModel} from '../../types/types';
import {CommonThunkType, InferActionsTypes} from '../store';
import {FormAction} from 'redux-form';
import {AuthActionsTypes} from '../auth/auth-reducer';
import {AppActionsTypes} from '../app/app-reducer';
import {commonThunkHandler} from '../thunk-handler';
import {projectsApi} from '../../api/firebase/projects-api';
import {TFirebaseCreateResponse} from '../../api/firebase/firebase';
import {TProjectFormData} from '../../components/projects/form/ProjectsForm';
import {updateObjectInArray} from '../../utils/helpers';

const initialState = {
    projects: null as Array<TProjectModel> | null
};

const projectsReducer = (state = initialState, action: ProjectsActionsTypes): TProjectInitialState => {
    switch (action.type) {
        case 'PORTFOLIO/PROJECTS/SET_PROJECTS':
            return {
                ...state,
                ...action.payload
            }
        case 'PORTFOLIO/PROJECTS/ADD_PROJECT':
            return {
                ...state,
                projects: [
                    ...(state.projects || []),
                    action.payload.project
                ]
            }
        case 'PORTFOLIO/PROJECTS/UPDATE_PROJECT':
            const {project} = action.payload;

            return {
                ...state,
                projects: updateObjectInArray(state.projects || [], project.id, 'id', {...project})
            }
        case 'PORTFOLIO/PROJECTS/DELETE_PROJECT':
            return {
                ...state,
                projects: state.projects?.filter(({id}) => id !== action.payload.id) || null
            }
        default:
            return state;
    }
};

// actions

export const projectsActions = {
    setProjects: (projects: Array<TProjectModel>) => ({
        type: 'PORTFOLIO/PROJECTS/SET_PROJECTS',
        payload: {projects}
    } as const),
    addProject: (project: TProjectModel) => ({
        type: 'PORTFOLIO/PROJECTS/ADD_PROJECT',
        payload: {project}
    } as const),
    updateProject: (project: TProjectModel) => ({
        type: 'PORTFOLIO/PROJECTS/UPDATE_PROJECT',
        payload: {project}
    } as const),
    deleteProject: (id: string) => ({
        type: 'PORTFOLIO/PROJECTS/DELETE_PROJECT',
        payload: {id}
    } as const)
}

// thunks

export const getProjects = (): ThunkType => async (dispatch) => {
    await commonThunkHandler(async () => {
        const data = await projectsApi.getProjects();

        if (data) {
            dispatch(projectsActions.setProjects(data));
        }

    }, dispatch, {
        resultCode: false
    });
}

export const addProject = (project: TProjectFormData): ThunkType => async (dispatch) => {
    await commonThunkHandler(async () => {
        const data = await projectsApi.create<TProjectFormData, TFirebaseCreateResponse>(project);

        if (data) {
            dispatch(projectsActions.addProject({...project, id: data.name}));
        }
    }, dispatch, {
        visualization: false,
        resultCode: false,
        status: true
    });
}

export const editProject = (project: TProjectFormData, id: string): ThunkType => async (dispatch) => {
    await commonThunkHandler(async () => {
        const data = await projectsApi.updateProject(project, id);

        if (data) {
            dispatch(projectsActions.updateProject({...project, id}));
        }
    }, dispatch, {
        visualization: false,
        resultCode: false,
        status: true
    });
}

export const deleteProject = (id: string): ThunkType => async (dispatch) => {
    await commonThunkHandler(async () => {
        const data = await projectsApi.deleteProject(id);

        if (data === null) {
            dispatch(projectsActions.deleteProject(id));
        }
    }, dispatch, {
        resultCode: false,
        visualization: false
    })
}

export type TProjectInitialState = typeof initialState;
type ProjectsActionsTypes = InferActionsTypes<typeof projectsActions>;
type ThunkType = CommonThunkType<FormAction | AuthActionsTypes | AppActionsTypes>
export default projectsReducer;
