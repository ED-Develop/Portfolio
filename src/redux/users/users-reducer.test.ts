import usersReducer, {
    follow,
    getAllUsers,
    getFriends,
    getUsers,
    TUsersInitialState,
    unFollow,
    userActions
} from "./users-reducer";
import {usersApi, UsersResponseType} from "../../api/users-api";
import {appActions} from "../app/app-reducer";
import {configureActions, mockStore} from "../../utils/test/mock-store";
import {ResultCodesEnum} from "../../api/api";
import {user, users} from "../../utils/test/models";

jest.mock('../../api/users-api');
const usersApiMock = usersApi as jest.Mocked<typeof usersApi>;

describe('Users Reducer: ', () => {
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

    test('should return initial state', () => {
        // @ts-ignore
        const newState = usersReducer(state, {type: 'FAKE'});

        expect(newState).toEqual(state);
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

    test('Pagination values should be Map', () => {
        const map = new Map<number, number>([[1, 2], [2, 1]]);
        const action = userActions.setPaginationValues(map);
        const newState = usersReducer(state, action);

        expect(newState.paginationValues).toEqual(map);
    });

    describe('Following in progress: ', () => {
        test('should remove id 2 from array', () => {
            const arrIds = [1, 2, 3];
            const action = userActions.toggleFollowingProgress(false, 2);
            const newState = usersReducer({...state, followingInProgress: arrIds}, action);

            expect(newState.followingInProgress.length).toBe(arrIds.length - 1);
            expect(newState.followingInProgress).not.toContain(2);
        });

        test('should add id 2 to array', () => {
            const arrIds = [1, 3];
            const action = userActions.toggleFollowingProgress(true, 2);
            const newState = usersReducer({...state, followingInProgress: arrIds}, action);

            expect(newState.followingInProgress.length).toBe(arrIds.length + 1);
            expect(newState.followingInProgress).toContain(2);
        });
    });

    describe('Thunks:', () => {
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
            expect(actions[3]).toEqual(userActions.setCurrentPage(1));
            expect(actions[4]).toEqual(appActions.toggleIsFetching(false));
        });

        test('Get friends', async () => {
            const getActions = configureActions<typeof getFriends, any>(1, 1);
            const actions = await getActions(usersApiMock.getFriends, response, mockStore, getFriends, 5);

            expect(actions[0]).toEqual(appActions.toggleIsFetching(true));
            expect(actions[1]).toEqual(userActions.setUsers(users));
            expect(actions[2]).toEqual(userActions.setTotalCount(4));
            expect(actions[3]).toEqual(userActions.setCurrentPage(1));
            expect(actions[4]).toEqual(appActions.toggleIsFetching(false));
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