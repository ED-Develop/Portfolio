import {FirebaseAPI, TFirebaseGetResponse} from './firebase';
import {TProjectModel} from '../../types/types';
import {TProjectFormData} from '../../components/projects/form/ProjectsForm';

class ProjectsApi extends FirebaseAPI {
    constructor() {
        super('/projects');
    }

    getProjects() {
        return this.get<TFirebaseGetResponse<TProjectModel>>().then(response => {
            return response
                ? Object.keys(response).map(key => {
                    return {
                        ...response[key],
                        id: key
                    }
                })
                : [];
        });
    }

    updateProject(project: TProjectFormData, id: string) {
        return this.update<TProjectFormData, TProjectFormData>(project, `/${id}`);
    }

    deleteProject(id: string) {
        return this.delete<null>(`/${id}`)
    }
}

export const projectsApi = new ProjectsApi();