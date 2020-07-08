import configureMockStore from 'redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {AppStateType} from "../../redux/store";
import {AnyAction} from "redux";

type DispatchExts = ThunkDispatch<AppStateType, void, AnyAction>;

const createMockStore = configureMockStore<AppStateType, DispatchExts>([thunk]);
export const mockStore = createMockStore();