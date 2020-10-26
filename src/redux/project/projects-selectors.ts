import {TSelector} from '../../hook/useSelector';
import {TProjectModel} from '../../types/types';

export const selectProjects: TSelector<Array<TProjectModel>> = (state) => state.projects.projects || [];

export const selectProjectById = (id: string): TSelector<TProjectModel | void> => (state) => {
    return state.projects.projects?.find(project => project.id === id);
}