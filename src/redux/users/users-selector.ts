import {AppStateType} from '../store';
import {TUserModel} from '../../types/types';
import {TSelector} from '../../hook/useSelector';

export const selectUsers: TSelector<Array<TUserModel>> = (state) => state.people.usersData;

export type TFriendsTitle = Omit<Omit<TUserModel, 'status'>, 'followed'>

export const selectCount = (state: AppStateType) => state.people.count;
export const selectCurrentPage = (state: AppStateType) => state.people.currentPage;
export const selectStartPage = (state: AppStateType) => state.people.startPage;
export const selectTotalCount = (state: AppStateType) => state.people.totalCount;
export const selectFollowingInProgress = (state: AppStateType) => state.people.followingInProgress;

