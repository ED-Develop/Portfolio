import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {AppStateType, CommonThunkType} from "../../redux/store";
import {AnyAction} from "redux";
import appState from "../../mock/app-state.json";
import {ArgumentTypes} from "../../types/types";

type DispatchExts = ThunkDispatch<AppStateType, void, AnyAction>;
type TMockStore = MockStoreEnhanced<AppStateType, DispatchExts>;

export const createMockStore = configureMockStore<AppStateType, DispatchExts>([thunk]);
// @ts-ignore
export const mockStore = createMockStore(appState);

export const configureActions = <T extends Function, R = {}>(...args: ArgumentTypes<T>) => {
    return async (
        mockedMethod: jest.MockInstance<any, any>,
        response: R,
        store: TMockStore,
        thunk: (...args: ArgumentTypes<T>) => CommonThunkType<any>,
        actionsCount: number
    ) => {
        mockedMethod.mockReturnValue(Promise.resolve(response));
        await store.dispatch(thunk(...args));
        const actions = store.getActions();

        expect(actions.length).toBe(actionsCount);

        return actions;
    }
};