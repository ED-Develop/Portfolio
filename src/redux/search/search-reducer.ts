import {CommonThunkType, InferActionsTypes} from "../store";
import {TUserModel} from "../../types/types";
import {AppActionsTypes} from "../app/app-reducer";
import {usersApi} from "../../api/users-api";
import {storage} from "../../api/local-storage/local-storage";

const key = 'social-network:searched';
const initialState = {
    searchString: '',
    searchItems: [] as Array<TUserModel>,
    isSearchFetching: false,
    totalCount: 0,
    currentPage: 1,
    count: 20
}

const searchReducer = (state = initialState, action: SearchActionsTypes): TSearchInitialState => {
    switch (action.type) {
        case "PORTFOLIO/SEARCH/SET_RESULTS":
        case "PORTFOLIO/SEARCH/TOGGLE_IS_SEARCH_FETCHING":
        case "PORTFOLIO/SEARCH/SET_TOTAL_COUNT":
        case "PORTFOLIO/SEARCH/SET_SEARCH_STRING":
            return {
                ...state,
                ...action.payload
            }
        case "PORTFOLIO/SEARCH/PUSH_SEARCH_ITEMS":
            return {
                ...state,
                searchItems: [...state.searchItems, ...action.payload]
            }
        default:
            return state;
    }
}

export const searchActions = {
    setSearchItems: (searchItems: Array<TUserModel>) => ({
        type: 'PORTFOLIO/SEARCH/SET_RESULTS',
        payload: {searchItems}
    } as const),
    pushSearchItems: (searchItems: Array<TUserModel>) => ({
        type: 'PORTFOLIO/SEARCH/PUSH_SEARCH_ITEMS',
        payload: searchItems
    } as const),
    toggleIsSearchFetching: (isSearchFetching: boolean) => ({
        type: 'PORTFOLIO/SEARCH/TOGGLE_IS_SEARCH_FETCHING',
        payload: {isSearchFetching}
    } as const),
    setTotalCount: (totalCount: number) => ({
        type: 'PORTFOLIO/SEARCH/SET_TOTAL_COUNT',
        payload: {totalCount}
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'PORTFOLIO/SEARCH/SET_TOTAL_COUNT',
        payload: {currentPage}
    } as const),
    setSearchString: (searchString: string) => ({
        type: 'PORTFOLIO/SEARCH/SET_SEARCH_STRING',
        payload: {searchString}
    } as const)
};

// thunks

export const searchItems = (string: string, next?: boolean): ThunkType => async (dispatch, getState) => {
    const searchState = getState().search;
    const {count, totalCount} = searchState;
    let currentPage = next ? searchState.currentPage : 1;

    if (next) currentPage += 1;

    if (currentPage + 1 > Math.ceil(totalCount / count) && next) return void 0;

    dispatch(searchActions.toggleIsSearchFetching(true));
    const data = await usersApi.searchUsers(string, count, currentPage);

    if (next) {
        dispatch(searchActions.pushSearchItems(data.items));
    } else {
        dispatch(searchActions.setSearchItems(data.items));
    }

    dispatch(searchActions.setSearchString(string));
    dispatch(searchActions.setTotalCount(data.totalCount));
    dispatch(searchActions.setCurrentPage(currentPage));
    dispatch(searchActions.toggleIsSearchFetching(false));
};

export const cashSelectedItem = (item: TUserModel): ThunkType => async () => {
    const cashed = await storage<Array<TUserModel>>(key);

    if (!cashed || cashed.some(i => i.id === item.id)) return void 0;

    let newCash = [...cashed];

    if (cashed.length >= 5) {
        newCash = newCash.slice(0, 4);
    }

    newCash.unshift(item);
    await storage(key, newCash);
}

export const restoreSearchList = (): ThunkType => async (dispatch) => {
    const data = await storage<Array<TUserModel>>(key);

    if (data) {
        dispatch(searchActions.setSearchItems(data));
    }
};

export type SearchActionsTypes = InferActionsTypes<typeof searchActions>;
export type TSearchInitialState = typeof initialState;
type ThunkType = CommonThunkType<SearchActionsTypes | AppActionsTypes>;

export default searchReducer;