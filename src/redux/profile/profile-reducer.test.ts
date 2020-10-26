import profileReducer, {getFriends, profileActions, TProfileInitialState, updateProfileData} from './profile-reducer';
import {usersApi, UsersResponseType} from '../../api/users-api';
import {users} from '../../utils/test/models';
import {configureActions, mockStore} from '../../utils/test/mock-store';
import {appActions} from '../app/app-reducer';
import {profileApi} from '../../api/profile-api';
import {BaseResponseType} from '../../api/api';
import profile from '../../__mock__/profile.json'
import {ProcessStatusEnum} from '../../types/types';

jest.mock('../../api/users-api');
const usersApiMock = usersApi as jest.Mocked<typeof usersApi>;

jest.mock('../../api/profile-api');
const profileApiMock = profileApi as jest.Mocked<typeof profileApi>;

describe('profile reducer', () => {
    let state: TProfileInitialState;

    beforeEach(() => {
        state = {
            profile: null,
            status: '',
            followed: false,
            isUpdateSuccess: false,
            friends: [],
            friendsCount: 0
        }
    });

    test('should return initial state', () => {
        // @ts-ignore
        const newState = profileReducer(state, {type: 'FAKE'});

        expect(newState).toEqual(state);
    });

    describe('Actions: ', () => {
        test('friends should be array of followed users', () => {
            const action = profileActions.setFriends(users);
            const newState = profileReducer(state, action);

            expect(newState.friends).toEqual(users);
        });

        test('friends count should be 10', () => {
            const action = profileActions.setFriendsCount(10);
            const newState = profileReducer(state, action);

            expect(newState.friendsCount).toBe(10);
        });
    });

    describe('Thunks: ', () => {
        const response: UsersResponseType = {
            error: '',
            items: users,
            totalCount: 4
        };

        beforeEach(() => {
            mockStore.clearActions();

        })

        test('Get friends', async () => {
            const actions = await configureActions()(usersApiMock.getFriends, response, getFriends, 4);

            expect(actions[0]).toEqual(appActions.toggleIsFetching(true));
            expect(actions[1]).toEqual(profileActions.setFriends(users));
            expect(actions[2]).toEqual(profileActions.setFriendsCount(4));
            expect(actions[3]).toEqual(appActions.toggleIsFetching(false));
        });

        describe('UpdateProfileData', () => {
            const response: BaseResponseType = {
                data: {},
                messages: [],
                resultCode: 0
            };

            test('should success update profile data', async () => {
                const actions = await configureActions<typeof updateProfileData>(profile)
                (profileApiMock.updateProfileData, response, updateProfileData, 4);

                expect(actions[0]).toEqual(appActions.changeProcessStatus(ProcessStatusEnum.Pending));
                expect(actions[1]).toEqual(profileActions.setUserProfile(profile));
                expect(actions[2]).toEqual(appActions.changeProcessStatus(ProcessStatusEnum.Success));
            })
        });
    });
});