import usersReducer, {getUsers, TUsersInitialState, userActions} from "./users-reducer";
import {usersApi, UsersResponseType} from "../../api/users-api";
import {appActions} from "../app-reducer";
import {mockStore} from "../../utils/test/mock-store";

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


        beforeEach(() => {
            mockStore.clearActions();
        });

        test('Get users', async () => {
            const users = [
                {...user},
                {...user, id: 2},
                {...user, id: 3},
                {...user, id: 4}
            ]

            const response: UsersResponseType = {
                error: '',
                items: users,
                totalCount: 500
            };

            usersApiMock.getUsers.mockReturnValue(Promise.resolve(response));
            await mockStore.dispatch(getUsers(4, 1));
            const actions = mockStore.getActions();

            expect(actions.length).toBe(5);
            expect(actions[0]).toEqual(appActions.toggleIsFetching(true));
            expect(actions[1]).toEqual(userActions.setUsers(users));
            expect(actions[2]).toEqual(userActions.setTotalCount(500));
            expect(actions[3]).toEqual(appActions.toggleIsFetching(false));
            expect(actions[4]).toEqual(userActions.setCurrentPage(1));
        });
    });
});