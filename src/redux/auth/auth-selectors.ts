import {TSelector} from '../../hook/useSelector';
import defaultAvatar from '../../assets/images/user.png';

export const selectUserAvatar: TSelector = state => state.auth.photos.small || defaultAvatar;