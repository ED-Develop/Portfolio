import appState from '../../__mock__/app-state.json';
import projectsReducer, {
    addProject, deleteProject,
    editProject,
    getProjects,
    projectsActions,
    TProjectInitialState
} from './projects-reducer';
import projects from '../../__mock__/projects.json';
import {findById} from '../../utils/helpers';
import {configureActions, mockStore} from '../../utils/test/mock-store';
import {projectsApi} from '../../api/firebase/projects-api';
import {appActions} from '../app/app-reducer';
import {ProcessStatusEnum} from '../../types/types';
import {TFirebaseCreateResponse} from '../../api/firebase/firebase';

jest.mock('../../api/firebase/projects-api');
const projectsApiMock = projectsApi as jest.Mocked<typeof projectsApi>;

describe('Projects reducer', () => {
    describe('Actions: ', () => {
        let state: TProjectInitialState;

        beforeEach(() => state = {...appState.projects});

        test('should return initial state', () => {
            // @ts-ignore
            const newState = projectsReducer(state, {type: 'FAKE'});

            expect(newState).toEqual(state);
        });

        test('should set array of projects', () => {
            const action = projectsActions.setProjects(projects);
            const newState = projectsReducer(state, action);

            expect(newState.projects).toEqual(projects);
        });

        test('should add new project', () => {
            const action = projectsActions.addProject(projects[0]);
            const newState = projectsReducer(state, action);

            expect(newState.projects).toContain(projects[0]);
        });

        test('should update project', () => {
            const newTitle = '123';
            const project = {...projects[0], title: newTitle};
            const action = projectsActions.updateProject(project);
            const newState = projectsReducer({...state, projects: projects}, action);

            expect(findById(newState.projects || [], projects[0].id)?.title).toEqual(newTitle);
        });

        test('should delete project', () => {
            const action = projectsActions.deleteProject(projects[0].id);
            const newState = projectsReducer({...state, projects: projects}, action);

            expect(findById(newState.projects || [], projects[0].id)).toBeFalsy()
        });
    });

    describe('Thunks', () => {
        beforeEach(() => {
            mockStore.clearActions();
            projectsApiMock.getProjects.mockClear();
        });

        test('getProjects', async () => {
            const getActions = configureActions<typeof getProjects>();
            const actions = await getActions(projectsApiMock.getProjects, projects, getProjects, 3);

            expect(actions[0]).toEqual(appActions.toggleIsFetching(true));
            expect(actions[1]).toEqual(projectsActions.setProjects(projects));
            expect(actions[2]).toEqual(appActions.toggleIsFetching(false));
        })

        test('addProject', async () => {
            const response: TFirebaseCreateResponse = {
                name: projects[0].id
            }
            const getActions = configureActions<typeof addProject>(projects[0]);
            const actions = await getActions(projectsApiMock.create, response, addProject, 3);

            expect(actions[0]).toEqual(appActions.changeProcessStatus(ProcessStatusEnum.Pending));
            expect(actions[1]).toEqual(projectsActions.addProject(projects[0]));
            expect(actions[2]).toEqual(appActions.changeProcessStatus(ProcessStatusEnum.Success));
        });

        test('editProject', async () => {
            const getActions = configureActions<typeof editProject>(projects[0], projects[0].id);
            const actions = await getActions(projectsApiMock.updateProject, projects[0], editProject, 3);

            expect(actions[0]).toEqual(appActions.changeProcessStatus(ProcessStatusEnum.Pending));
            expect(actions[1]).toEqual(projectsActions.updateProject(projects[0]));
            expect(actions[2]).toEqual(appActions.changeProcessStatus(ProcessStatusEnum.Success));
        });

        test('deleteProject', async () => {
            const getActions = configureActions<typeof deleteProject, null>(projects[0].id);
            const actions = await getActions(projectsApiMock.deleteProject, null, deleteProject, 1);

            expect(actions[0]).toEqual(projectsActions.deleteProject(projects[0].id));
        });
    });
});