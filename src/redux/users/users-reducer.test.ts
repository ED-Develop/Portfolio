import usersReducer, {
    follow,
    getAllUsers,
    getFriends,
    getUsers,
    searchUsers,
    TUsersInitialState,
    unFollow,
    userActions
} from "./users-reducer";
import {usersApi, UsersResponseType} from "../../api/users-api";
import {appActions} from "../app-reducer";
import {configureActions, mockStore} from "../../utils/test/mock-store";
import {ResultCodesEnum} from "../../api/api";

jest.mock('../../api/users-api');
const usersApiMock = usersApi as jest.Mocked<typeof usersApi>;

describe('Users Reducer: ', () => {
    const user = {id: 1, followed: false, name: 'Test', photos: {large: null, small: null}, status: 'test'}
    let state: TUsersInitialState;

    beforeEach(() => {
        state = {
            usersData: [],
            paginationValues: null,
            count: 15,
            currentPage: 1,
            followingInProgress: [],
            startPage: 1,
            totalCount: 0
        }
    });

    test('user should be followed', () => {
        const action = userActions.followSuccess(1);
        const newState = usersReducer({...state, usersData: [user]}, action);

        expect(newState.usersData.find(user => user.id = 1)?.followed).toBeTruthy();
    });

    test('user should be un followed', () => {
        const action = userActions.unFollowSuccess(1);
        const newState = usersReducer({...state, usersData: [{...user, followed: false}]}, action);

        expect(newState.usersData.find(user => user.id = 1)?.followed).toBeFalsy();
    });

    test('users data field shouldn\'t be empty', () => {
        const action = userActions.setUsers([user]);
        const newState = usersReducer(state, action);

        expect(newState.usersData.length).not.toBe(0);
    });

    test('current page should be 2', () => {
        const action = userActions.setCurrentPage(2);
        const newState = usersReducer(state, action);

        expect(newState.currentPage).toBe(2);
    });

    test('Total count should be 10', () => {
        const action = userActions.setTotalCount(10);
        const newState = usersReducer(state, action);

        expect(newState.totalCount).toBe(10);
    });

    test('Page size should be 30', () => {
        const action = userActions.setPageSize(30);
        const newState = usersReducer(state, action);

        expect(newState.count).toBe(30);
    });

    describe('Thunks:', () => {
        const users = [
            {...user},
            {...user, id: 2},
            {...user, id: 3},
            {...user, id: 4}
        ];

        const response: UsersResponseType = {
            error: '',
            items: users,
            totalCount: 4
        };

        beforeEach(() => {
            mockStore.clearActions();
            usersApiMock.getUsers.mockClear();
        });

        test('Get users', async () => {
            const getActions = configureActions<typeof getUsers, any>(4, 1);
            const actions = await getActions(usersApiMock.getUsers, response, mockStore, getUsers, 5);

            expect(actions[0]).toEqual(appActions.toggleIsFetching(true));
            expect(actions[1]).toEqual(userActions.setUsers(users));
            expect(actions[2]).toEqual(userActions.setTotalCount(4));
            expect(actions[3]).toEqual(appActions.toggleIsFetching(false));
            expect(actions[4]).toEqual(userActions.setCurrentPage(1));
        });

        test('Get friends', async () => {
            const getActions = configureActions<typeof getFriends, any>(1, 1);
            const actions = await getActions(usersApiMock.getFriends, response, mockStore, getFriends, 5);

            expect(actions[0]).toEqual(appActions.toggleIsFetching(true));
            expect(actions[1]).toEqual(userActions.setUsers(users));
            expect(actions[2]).toEqual(userActions.setTotalCount(4));
            expect(actions[3]).toEqual(appActions.toggleIsFetching(false));
            expect(actions[4]).toEqual(userActions.setCurrentPage(1));
        });

        test('Get all users', async () => {
            const getActions = configureActions<typeof getAllUsers>(4, 1);
            const actions = await getActions(usersApiMock.getUsers, response, mockStore, getAllUsers, 7);

            expect(actions[0]).toEqual(appActions.toggleIsFetching(true));
            expect(actions[1]).toEqual(userActions.setTotalCount(4));
            expect(actions[2]).toEqual(userActions.setPaginationValues(new Map([[1, 1], [2, 1]])));
            expect(actions[3]).toEqual(userActions.setUsers(users));
            expect(actions[4]).toEqual(userActions.setTotalCount(4));
            expect(actions[5]).toEqual(userActions.setCurrentPage(1));
            expect(actions[6]).toEqual(appActions.toggleIsFetching(false));
        });

        test('Search users', async () => {
            const getActions = configureActions<typeof searchUsers>('Test');
            const actions = await getActions(usersApiMock.searchUsers, response, mockStore, searchUsers, 4);

            expect(actions[0]).toEqual(appActions.toggleIsFetching(true));
            expect(actions[1]).toEqual(userActions.setUsers(users));
            expect(actions[2]).toEqual(userActions.setTotalCount(4));
            expect(actions[3]).toEqual(appActions.toggleIsFetching(false));
        });

        describe('follow flow: ', () => {
            const resultCode = ResultCodesEnum.Success;

            test('Follow', async () => {
                const getActions = configureActions<typeof follow>(1);
                const actions = await getActions(usersApiMock.follow, resultCode, mockStore, follow, 3);

                expect(actions[0]).toEqual(userActions.toggleFollowingProgress(true, 1));
                expect(actions[1]).toEqual(userActions.followSuccess(1));
                expect(actions[2]).toEqual(userActions.toggleFollowingProgress(false, 1));
            });

            test('Un follow', async () => {
                const getActions = configureActions<typeof unFollow>(1);
                const actions = await getActions(usersApiMock.unFollow, resultCode, mockStore, unFollow, 3);

                expect(actions[0]).toEqual(userActions.toggleFollowingProgress(true, 1));
                expect(actions[1]).toEqual(userActions.unFollowSuccess(1));
                expect(actions[2]).toEqual(userActions.toggleFollowingProgress(false, 1));
            });
        })
    });
});