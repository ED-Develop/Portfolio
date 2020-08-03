import searchReducer, {
    cashSelectedItem,
    restoreSearchList,
    searchActions,
    searchItems,
    TSearchInitialState
} from "./search-reducer";
import {user, users} from "../../utils/test/models";
import {usersApi, UsersResponseType} from "../../api/users-api";
import {configureActions, mockStore} from "../../utils/test/mock-store";
import {storage} from "../../api/local-storage/local-storage";
import {TUserModel} from "../../types/types";
import appState from '../../__mock__/app-state.json';

jest.mock('../../api/users-api');
jest.mock('../../api/local-storage/local-storage');

const usersApiMock = usersApi as jest.Mocked<typeof usersApi>;
const storageMock = storage as jest.MockedFunction<typeof storage>;

describe('Search reducer: ', () => {
    let state: TSearchInitialState;

    beforeEach(() => {
        state = appState.search;
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

        test('toggle is search fetching', () => {
            const action = searchActions.toggleIsSearchFetching(true);
            const newState = searchReducer(state, action);

            expect(newState.isSearchFetching).toBeTruthy();
        });

        test('set total count', () => {
            const action = searchActions.setTotalCount(5);
            const newState = searchReducer(state, action);

            expect(newState.totalCount).toBe(5);
        });

        test('set current page', () => {
            const action = searchActions.setCurrentPage(2);
            const newState = searchReducer(state, action);

            expect(newState.currentPage).toBe(2);
        });

        test('push search items', () => {
            const action = searchActions.pushSearchItems(users);
            const newState = searchReducer(state, action);

            expect(newState.searchItems).toEqual(users);
        });

        test('set search string', () => {
            const action = searchActions.setSearchString('test');
            const newState = searchReducer(state, action);

            expect(newState.searchString).toBe('test');
        })
    });

    describe('Thunks: ', () => {
        const response: UsersResponseType = {
            error: '',
            items: users,
            totalCount: 15
        };

        beforeEach(() => {
            mockStore.clearActions();
            storageMock.mockClear();
        });

        describe('Search items: ', () => {
            test('should set new items', async () => {
                const getActions = configureActions<typeof searchItems>('test');
                const actions = await getActions(usersApiMock.searchUsers, response, mockStore, searchItems, 6);

                expect(actions[0]).toEqual(searchActions.toggleIsSearchFetching(true));
                expect(actions[1]).toEqual(searchActions.setSearchItems(users));
                expect(actions[2]).toEqual(searchActions.setSearchString('test'));
                expect(actions[3]).toEqual(searchActions.setTotalCount(15));
                expect(actions[4]).toEqual(searchActions.setCurrentPage(1));
                expect(actions[5]).toEqual(searchActions.toggleIsSearchFetching(false));
            });

            test('should push items to array', async () => {
                const getActions = configureActions<typeof searchItems>('test', true);
                const actions = await getActions(usersApiMock.searchUsers, response, mockStore, searchItems, 6);

                expect(actions[0]).toEqual(searchActions.toggleIsSearchFetching(true));
                expect(actions[1]).toEqual(searchActions.pushSearchItems(users));
                expect(actions[2]).toEqual(searchActions.setSearchString('test'));
                expect(actions[3]).toEqual(searchActions.setTotalCount(15));
                expect(actions[4]).toEqual(searchActions.setCurrentPage(2));
                expect(actions[5]).toEqual(searchActions.toggleIsSearchFetching(false));
            });
        });

        describe('Restore search list', () => {
            test(' should be defined', () => {
                expect(restoreSearchList).toBeDefined();
            });

            test('should dispatch correct actions', async () => {
                const getActions = configureActions<typeof restoreSearchList>();
                const actions = await getActions(storageMock, users, mockStore, restoreSearchList, 1);

                expect(actions[0]).toEqual(searchActions.setSearchItems(users));
            });
        });

        describe('Cash selected items', () => {
            let expectedCash: Array<TUserModel>;

            beforeEach(() => {
                expectedCash = [{...user, id: 10}];
            })

            test('should be defined', () => {
                expect(cashSelectedItem).toBeDefined();
            });

            test('shouldn\'t cash item if item exist', async () => {
                const getActions = configureActions<typeof cashSelectedItem>(user);
                await getActions(storageMock, users, mockStore, cashSelectedItem, 0);

                expect(storageMock).toHaveBeenCalledTimes(1);
            });

            test('should cash item', async () => {
                const getActions = configureActions<typeof cashSelectedItem>({...user, id: 10});
                await getActions(storageMock, [], mockStore, cashSelectedItem, 0);

                expect(storageMock).toHaveBeenNthCalledWith(1, 'social-network:searched');
                expect(storageMock).toHaveBeenNthCalledWith(2, 'social-network:searched', expectedCash);
            });

            test('cash length should be not more 5', async () => {
                const getActions = configureActions<typeof cashSelectedItem>({...user, id: 10});
                await getActions(storageMock, users, mockStore, cashSelectedItem, 0);
                const cashedItems = storageMock.mock.calls[1][1] as Array<TUserModel>;

                expect(cashedItems.length).toBe(5);
            });
        });
    })
});