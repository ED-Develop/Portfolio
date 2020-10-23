import {TId} from '../types/types';
import {PeopleFilterEnum} from '../components/people/PeopleContainer';

export const routes = [
    {name: 'base', path: '/'},
    {name: 'profile', path: '/profile/:userId?'},
    {name: 'profile:timeline', path: '/profile/:userId?/timeline'},
    {name: 'profile:about', path: '/profile/:userId?/about'},
    {name: 'profile:photos', path: '/profile/:userId?/photos'},
    {name: 'profile:videos', path: '/profile/:userId?/videos'},
    {name: 'login', path: '/sign-in'},
    {name: 'sign-up', path: 'https://social-network.samuraijs.com/signUp'},
    {name: 'reset-password', path: 'https://social-network.samuraijs.com/login'},
    {name: 'messages', path: '/messages/:userId?'},
    {name: 'people', path: '/people/:filter?'},
    {name: 'projects', path: '/projects'},
    {name: 'projects:add', path: '/projects/add'},
    {name: 'projects:update', path: '/projects/:projectId/edit'},
    {name: 'settings', path: '/settings'},
    {name: 'settings:links', path: '/settings/links'},
    {name: 'settings:delete', path: '/settings/delete'},
] as const;

export type TParams = {
    profile: {
        userId: TId | null
    },
    messages: {
        userId: TId
    },
    people: {
        filter: PeopleFilterEnum | null
    },
    projects: {
        projectId: string
    }
}