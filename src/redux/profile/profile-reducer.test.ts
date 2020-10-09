import profileReducer, {getFriends, profileActions, TProfileInitialState} from "./profile-reducer";
import {usersApi, UsersResponseType} from "../../api/users-api";
import {users} from "../../utils/test/models";
import {configureActions, mockStore} from "../../utils/test/mock-store";
import {appActions} from "../app/app-reducer";

jest.mock('../../api/users-api');
const usersApiMock = usersApi as jest.Mocked<typeof usersApi>;

describe('Profile reducer', () => {
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
            const actions = await configureActions()(usersApiMock.getFriends, response, mockStore, getFriends, 4);

            expect(actions[0]).toEqual(appActions.toggleIsFetching(true));
            expect(actions[1]).toEqual(profileActions.setFriends(users));
            expect(actions[2]).toEqual(profileActions.setFriendsCount(4));
            expect(actions[3]).toEqual(appActions.toggleIsFetching(false));
        })
    });
});