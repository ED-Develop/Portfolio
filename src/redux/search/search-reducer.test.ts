import searchReducer, {searchActions, searchItems, TSearchInitialState} from "./search-reducer";
import {users} from "../../utils/test/models";
import {usersApi, UsersResponseType} from "../../api/users-api";
import {configureActions, mockStore} from "../../utils/test/mock-store";
import {appActions} from "../app-reducer";

jest.mock('../../api/users-api');
const usersApiMock = usersApi as jest.Mocked<typeof usersApi>;

describe('Search reducer: ', () => {
    let state: TSearchInitialState;

    beforeEach(() => {
        state = {
            searchItems: []
        }
    })

    test('should return initial state', () => {
        // @ts-ignore
        const newState = searchReducer(state, {type: 'FAKE'});

        expect(newState).toEqual(state);
    });

    describe('Actions', () => {
        test('should set results', () => {
            const action = searchActions.setSearchItems(users);
            const newState = searchReducer(state, action);

            expect(newState.searchItems).toEqual(users);
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
        });

        test('Search items', async () => {
            const getActions = configureActions<typeof searchItems>('test');
            const actions = await getActions(usersApiMock.searchUsers, response, mockStore, searchItems, 3);

            expect(actions[0]).toEqual(appActions.toggleIsFetching(true));
            expect(actions[1]).toEqual(searchActions.setSearchItems(users));
            expect(actions[2]).toEqual(appActions.toggleIsFetching(false));
        });
    })
});