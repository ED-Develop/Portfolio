import {TSelector} from '../../hook/useSelector';

export const selectMessages: TSelector = (state) => state.chat.messages;
export const selectStatus: TSelector = (state) => state.chat.status;
