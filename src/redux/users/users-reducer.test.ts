import usersReducer, {getUsers, TUsersInitialState, userActions} from "./users-reducer";
import {usersApi, UsersResponseType} from "../../api/users-api";
import {appActions} from "../app-reducer";

jest.mock('../../api/users-api');

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
        const newState = usersReducer({...state, usersData: [user]}, action)

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
        const dispatchMock = jest.fn();
        const getStateMock = jest.fn();

        const usersApiMock = usersApi as jest.Mocked<typeof usersApi>;

        beforeEach(() => {
            dispatchMock.mockClear();
            getStateMock.mockClear();
        });

        test('Get users', async () => {
            const thunk = getUsers(4, 1);
            const response: UsersResponseType = {
                error: '',
                items: [
                    {...user},
                    {...user, id: 2},
                    {...user, id: 3},
                    {...user, id: 4}
                ],
                totalCount: 500
            };

            const users = [
                {...user},
                {...user, id: 2},
                {...user, id: 3},
                {...user, id: 4}
            ]

            usersApiMock.getUsers.mockReturnValue(Promise.resolve(response));
            await thunk(dispatchMock, getStateMock, {});

            expect(dispatchMock).toBeCalledTimes(5);
            expect(dispatchMock).toHaveBeenNthCalledWith(1, appActions.toggleIsFetching(true));
            expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.setUsers(users));
            expect(dispatchMock).toHaveBeenNthCalledWith(3, userActions.setTotalCount(500));
            expect(dispatchMock).toHaveBeenNthCalledWith(4, appActions.toggleIsFetching(false));
            expect(dispatchMock).toHaveBeenNthCalledWith(5, userActions.setCurrentPage(1));
        });
    });
});