import usersReducer, {TUsersInitialState, userActions} from "./users-reducer";

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
    })

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

    test('')
});